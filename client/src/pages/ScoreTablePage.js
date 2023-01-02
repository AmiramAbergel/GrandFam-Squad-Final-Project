import { useUserGrandParents } from '../hooks/GrandParentsGroupContext.js';

const ScoreTablePage = () => {
    const { myGrandParents } = useUserGrandParents();
    return (
        <>
            <h1>{myGrandParents}</h1>
        </>
    );
};
export default ScoreTablePage;
