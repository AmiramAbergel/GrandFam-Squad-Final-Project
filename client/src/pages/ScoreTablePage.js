const ScoreTablePage = (props) => {
    console.log(props.data[0].familyName);
    return (
        <>
            <h1>{props.data[0].familyName}</h1>
        </>
    );
};
export default ScoreTablePage;
