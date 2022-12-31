import { m2s } from 'mongoose-to-swagger';
import { FamilyMember } from '../../models/familyMember.model.js';
import { GrandParents } from '../../models/grandParents.model.js';
import { GrandParentsTasks } from '../../models/grandParentsTasks.model.js';
import { Subscription } from '../../models/notificationSubscription.model.js';
import { User } from '../../models/userAuth.model.js';
export default {
    user: m2s(User),
    grandParents: m2s(GrandParents),
    familyMember: m2s(FamilyMember),
    weeklyScoreTable: m2s(weeklyScoreTable),
    subscription: m2s(Subscription),
    grandParentsTasks: m2s(GrandParentsTasks),
};
