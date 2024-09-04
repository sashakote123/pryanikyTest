import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { useAuth } from './hooks/useAuth';
import { useEffect, useState } from 'react';
import AddPost from './AddPost';
import EditPost from './EditPost';



function SimpleTable() {

    const URL = 'https://test.v5.pryaniky.com'
    const tableURL = `${URL}/ru/data/v3/testmethods/docs/userdocs/get`
    const createPostURL = `${URL}/ru/data/v3/testmethods/docs/userdocs/create`

    const { key } = useAuth()
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newRow, setNewRow] = useState({});
    const [editRow, setEditRow] = useState(null);

    useEffect(() => {
        fetch(tableURL, {
            method: 'GET',
            headers: {
                'x-auth': key,
            },
        })
            .then((resp) => resp.json())
            .then((json) => {
                setTableData(json.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }, [tableURL, key, tableData]);

    const handleDelete = (id) => {
        const deleteURL = `${URL}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`
        fetch(deleteURL, {
            method: 'POST',
            headers: {
                'x-auth': key,
            },
        })

    };

    const handleEdit = (row) => {
        setEditRow(row);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setIsAdding(true);
        setNewRow({});
    };

    const handleCancel = () => {
        setIsAdding(false);
        setIsEditing(false);
        setNewRow({});
        setEditRow(null);
    };

    const handleChange = (e, header) => {
        if (isEditing) {
            setEditRow({
                ...editRow,
                [header]: e.target.value,
            });
        } else {
            setNewRow({
                ...newRow,
                [header]: e.target.value,
            });
        }
    };

    const handleConfirm = () => {
        let rowData;
        if (isEditing) {
            rowData = editRow;
            fetch(createPostURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth': key,
                },
                body: JSON.stringify(rowData)
            })
                .then((resp) => resp.json())
            fetch(tableURL, {
                method: 'GET',
                headers: {
                    'x-auth': key,
                },
            })
                .then((resp) => resp.json())
                .then((json) => {
                    setTableData(json.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                });
        } else {
            const isoString = new Date(Date.now()).toISOString();
            rowData = newRow;
            rowData['employeeSigDate'] = isoString
            rowData.companySigDate = isoString

            fetch(createPostURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth': key,
                },
                body: JSON.stringify(rowData)
            })
                .then((resp) => resp.json())
            fetch(tableURL, {
                method: 'GET',
                headers: {
                    'x-auth': key,
                },
            })
                .then((resp) => resp.json())
                .then((json) => {
                    setTableData(json.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                });
        }
        setIsAdding(false);
        setIsEditing(false);
        setNewRow({});
        setEditRow(null);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!tableData || tableData.length === 0) {
        setTableData([{
            documentStatus: '',
            employeeNumber: '',
            documentType: '',
            documentName: '',
            companySignatureName: '',
            employeeSignatureName: '',
            employeeSigDate: '',
            companySigDate: '',
        }])
        return (<>
            <Box sx={{ mt: 2, }}>
                <Button variant="contained" color="primary" onClick={handleAddNew}>
                    Добавить запись
                </Button>
            </Box>
        </>
        )

    }

    const headers = tableData ? Object.keys(tableData[0]) : [
        "companySigDate",
        "companySignatureName",
        "documentName",
        "documentStatus",
        "documentType",
        "employeeNumber",
        "employeeSigDate",
        "employeeSignatureName"];


    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
            <TableContainer component={Paper} sx={{ borderRadius: 1, boxShadow: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#c9c9c9', color: 'primary.contrastText' }}>
                            {headers.map((header) => (
                                <TableCell key={header}>{header}</TableCell>
                            ))}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow key={row.id}>
                                {headers.map((header) => (
                                    <TableCell
                                        key={`${row.id}-${header}`}
                                        sx={{
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            padding: '8px',
                                        }}>
                                        {row[header]}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <Button color="primary" onClick={() => handleEdit(row)}>
                                        Изменить
                                    </Button>
                                    <Button color="secondary" onClick={() => handleDelete(row.id)}>
                                        Удалить
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {(isAdding || isEditing) && (
                            (isAdding ? (
                                <AddPost
                                    headers={headers}
                                    newRow={newRow}
                                    onChange={handleChange}
                                    onConfirm={handleConfirm}
                                    onCancel={handleCancel}
                                />
                            ) : (
                                <EditPost
                                    headers={headers}
                                    row={editRow}
                                    onChange={handleChange}
                                    onConfirm={handleConfirm}
                                    onCancel={handleCancel}
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {!isAdding && !isEditing && (
                <Box sx={{ mt: 2, textAlign: 'right' }}>
                    <Button variant="contained" color="primary" onClick={handleAddNew}>
                        Добавить запись
                    </Button>
                </Box>
            )}

        </Box>
    );
}



export default SimpleTable;