import { GrandParents } from '../models/grandParents.model.js';
import { User } from '../models/userAuth.model.js';
import { WeeklyScoreTable } from '../models/weeklyScoreTable.model.js';
import { createOne, deleteOne, getAll, getOne } from './factoryHandler.js';

// admin only
export const createGrandparents = async (req, res, next) => {
    let newGrandparents;
    try {
        newGrandparents = await GrandParents.create({
            grandma: req.body.grandma,
            spouse: req.body.spouse,
            familyName: req.body.familyName,
            sharedWith: req.body.sharedWith,
            address: req.body.address,
            phone: req.body.phone,
            location: req.body.location,
        });

        const getWeek = () => {
            let curr = new Date();
            let week = [];

            for (let i = 1; i <= 7; i++) {
                let first = curr.getDate() - curr.getDay() + i;
                let day = new Date(curr.setDate(first))
                    .toISOString()
                    .slice(0, 10);
                week.push(day);
            }
            return week;
        };

        const createScoreTable = await WeeklyScoreTable.create({
            familyID: newGrandparents._id,
            familyName: newGrandparents.familyName,
            week: getWeek(),
            rank: [newGrandparents.sharedWith],
        });
        const grandAssociate = await GrandParents.findByIdAndUpdate(
            newGrandparents._id,
            { $set: { familyScore: createScoreTable._id } },
            { new: true }
        );

        let grandparentsUser = await User.findByIdAndUpdate(
            req.body.sharedWith[0],
            {
                $push: { myGrandparentsGroups: newGrandparents._id },
            },
            { new: true }
        );
        res.status(201).json({
            status: 'success',
            data: {
                newGrandparents,
                createScoreTable,
            },
        });
    } catch (err) {
        // delete the familyMember document if the newUser document was not created
        if (newGrandparents) {
            await newGrandparents.deleteOne();
        }
        next(err, req, res);
    }
};
//export const createGrandparents = createOne(GrandParents);

export const getAllGrandparents = getAll(GrandParents);
export const getGrandparents = getOne(GrandParents);
export const deleteGrandparents = deleteOne(GrandParents);
