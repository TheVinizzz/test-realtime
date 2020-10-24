import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function AddHashtag(props) {

    const [addHashtag, setAddHash] = useState()

    return (
        <div>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="hashtag"
                name="Adicionar Hashtag"
                autoComplete="Hashtag"
                autoFocus
                label="Adicionar Hashtag"
                onChange={(e) => setAddHash(e.target.value)}
            />

            <Button variant="contained" color="primary" onClick={(e) => {
                props.timeclick(addHashtag)
            }}>
                Criar
</Button>
        </div>
    )
}

export default AddHashtag
