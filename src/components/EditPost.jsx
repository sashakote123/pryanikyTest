import React from 'react';
import { TableRow, TableCell, TextField, Button } from '@mui/material';

function EditPost({ headers, row, onChange, onConfirm, onCancel }) {
    return (
        <TableRow>
            {headers.map((header) => (
                <TableCell key={`edit-${header}`}>
                    {header !== 'employeeSigDate' 
                    && header !== 'companySigDate'
                    && header !== 'id' ?
                        <TextField
                            value={row[header] || ''}
                            onChange={(e) => onChange(e, header)}
                            fullWidth
                        /> : row[header]}
                </TableCell>
            ))}
            <TableCell>
                <Button color="primary" onClick={onConfirm}>
                    Применить
                </Button>
                <Button color="secondary" onClick={onCancel}>
                    Отменить
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default EditPost;
