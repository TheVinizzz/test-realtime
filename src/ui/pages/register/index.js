import React, {useRef, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import {Link, Redirect} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {register} from "../../actions/accountActions";
import {LOGIN_ROUTE} from "../../../Router";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',

        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.main,
        width: 128,
        height: 128
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    submit: {},
}));

export default function RegisterPage() {

    const classes = useStyles();

    const [profilePhoto, setProfilePhoto] = useState();
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [user, setUser] = useState({ err: false, text: "" });
    const [pass, setPass] = useState({ err: false, text: "" });
    const photoInpufRef = useRef(null);

    const uid = useSelector((state) => state.firebase?.auth?.uid);

    const onPhotoInputChange = function (event) {
        let file = event.target.files[0];

        setProfilePhoto(file);
    }
    return (
        <Grid container alignContent="center" justify={"center"} direction={"column"}>
            <Grid item>
                <Card elevation={4}>
                    {uid ? <Redirect to="/" /> : null }
                    <Container component="main" maxWidth="xs">
                        <div className={classes.paper}>
                            <form className={classes.form} onSubmit={async (e) => {
                                e.preventDefault();
                                try {
                                    await register(email, password, {
                                        email: email,
                                        name: name,
                                        contacts: {},
                                        createdAt: new Date(Date.now()),
                                        updatedAt: new Date(Date.now()),
                                    }, profilePhoto);
                                } catch (error) {
                                    if (error.code === "auth/email-already-in-use") {
                                        setUser({ err: true, text: "Este email está em uso!" });
                                        setPass({ err: false, text: "" })
                                    }
                                    else if (error.code === "auth/weak-password") {
                                        setPass({ err: true, text: "Sua senha deve ter de 6 a 8 caracteres!" });
                                        setUser({ err: false, text: "" })

                                    } else {
                                        console.log(error)
                                    }
                                }
                            }}>
                                <Avatar
                                    className={classes.avatar}
                                    src={profilePhoto != null ? URL.createObjectURL(profilePhoto) : null}
                                >
                                    <Typography variant={"h2"}>{name?.substring(0, 1) ?? ""}</Typography>
                                </Avatar>
                                <Box m={2} />
                                <Button onClick={() => photoInpufRef.current.click()} fullWidth color={"primary"} style={{margin: "auto"}}>Alterar foto</Button>
                                <input hidden type="file" ref={photoInpufRef} accept={"image/*"}  onChange={onPhotoInputChange}/>

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={user.err}
                                    helperText={user.text}
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    onChange={(e) => setName(e.target.value)}
                                    label="Nome"
                                    name="name"
                                    autoComplete="name"
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Senha"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={pass.err}
                                    helperText={pass.text}
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirmar senha"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="current-password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <Box height={"12px"} />
                                <Grid container direction="row-reverse" justify={"space-between"}>
                                    <Grid item>
                                        {password === confirmPassword ?
                                            <Button

                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                                desabled={true}
                                            >
                                                Cadastrar
                                            </Button> :
                                            <Button variant="contained" disabled>
                                                Senhas Diferentes
                                            </Button>
                                        }
                                    </Grid>
                                    <Grid item>
                                        <Box width={"12px"} />
                                    </Grid>
                                    <Grid item>
                                        <Link style={{ textDecoration: "none" }} to={LOGIN_ROUTE} >
                                            <Button
                                                color="primary"
                                            >
                                                Voltar
                                            </Button>
                                        </Link>
                                    </Grid>
                                </Grid>

                                <Box height={"24px"} />
                            </form>
                        </div>
                    </Container>
                </Card>
            </Grid>
        </Grid>
    );
}
