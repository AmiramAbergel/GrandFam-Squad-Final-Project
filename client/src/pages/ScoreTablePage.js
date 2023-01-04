import React from 'react';
import styled from '@emotion/styled';

const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;
    tr {
        &:nth-of-type(odd) {
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
    const { data } = props;

    return data?.length === 0 || !data ? (
        'Loading...'
    ) : (
        <Table>
            <thead>
                <tr>
                    <th>Family ID</th>
                    <th>Family Name</th>
                    <th>Week</th>
                    <th>Rank</th>
                </tr>
            </thead>
            <tbody>
                {Object.values(data).map((item) => (
                    <tr key={item._id}>
                        <td>{item.familyID}</td>
                        <td>{item.familyName}</td>
                        <td>{item.week ? item.week.join(', ') : '-'}</td>
                        {/* <td>{item.rank ? item.rank[0] : '-'}</td> */}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ScoreTablePage;
