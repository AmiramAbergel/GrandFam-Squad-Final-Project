import React from 'react';
import styled from '@emotion/styled';

const TableWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
`;

const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;

    font-size: 1.3rem;
    tr {
        &:nth-of-type(odd) {
            background-color: #f5f5f5;
        }
        &:nth-of-type(even) {
            background-color: #f5f5f5;
        }
        &:hover {
            background-color: #39e991;
            cursor: pointer;
            td {
                color: #262833;
            }
        }
        td {
            padding: 10px;
            border: 1px solid #ccc;
            &:first-of-type {
                width: 15%;
            }
            &:last-of-type {
                width: 15%;
            }
        }
        th {
            text-align: left;
            padding: 10px;
            background-color: #67eeaa;
            color: #ffffff;
            border: 1px solid #ccc;
        }
    }
`;

const ScoreTablePage = (props) => {
    const { scoreData, usersData } = props;

    return scoreData?.length === 0 || !scoreData ? (
        'Loading...'
    ) : (
        <TableWrapper>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Week</th>
                        <th>Rank</th>
                    </tr>
                </thead>
                <tbody>
                    {usersData.map((item, i) => (
                        <tr key={i}>
                            <td>{item.name}</td>
                            <td>{item.lastName}</td>
                            <td>{scoreData.week.join(' , ')}</td>
                            <td>0</td>
                            {/* <td>{item.rank ? item.rank[0] : '-'}</td> */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </TableWrapper>
    );
};

export default ScoreTablePage;
