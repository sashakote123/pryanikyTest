import { Button, TableCell, TableRow, TextField } from "@mui/material";

function AddPost({ headers, newRow, onChange, onConfirm, onCancel }) {
    return (
        <TableRow>
            {headers.map((header) => (
                <TableCell key={`new-${header}`}>
                    {header !== 'employeeSigDate'
                        && header !== 'companySigDate'
                        && header !== 'id' ?
                        <TextField
                            value={newRow[header] || ''}
                            onChange={(e) => onChange(e, header)}
                            fullWidth
                        /> : <></>
                    }
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

export default AddPost;