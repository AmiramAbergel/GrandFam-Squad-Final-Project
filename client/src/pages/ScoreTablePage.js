import { useUserGrandParents } from '../hooks/GrandParentsContext.js';

const ScoreTablePage = () => {
    const { myGrandParents } = useUserGrandParents();
    return (
        <>
            <h1>{myGrandParents}</h1>
        </>
    );
};
export default ScoreTablePage;
