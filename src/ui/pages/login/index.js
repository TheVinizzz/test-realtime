import React, {useState} from 'react';
import {Link as RouterLink, Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Card from "@material-ui/core/Card";
import {APP_ROUTE, REGISTER_ROUTE} from "../../../Router";

//import StartupSpaceLogo from "../../../assets/navbar/loadingScreen.png";
import {Link} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../actions/accountActions";
import {useHistory} from "react-router";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: 10,
        display: 'flex',

        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    view: {
        height: "83vh"
    },
    form: {

        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {},
}));


export default function LoginPage() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [user, setUser] = useState({ err: false, text: "" });
    const [pass, setPass] = useState({ err: false, text: "" });

    const uid = useSelector((state) => state.firebase?.auth?.uid);
    return (
        <div className={classes.view}>
            {uid ? <Redirect to="/" /> : null }
            <Grid container alignContent="center" justify="center" direction="column">
                <Grid item>
                    <Card elevation={4} className="mt-24">
                        <Container component="main" maxWidth="xs">

                            <div className={classes.paper}>
                                <img width="360dp" />
                                <Box height={"36px"} />
                                <form className={classes.form} noValidate onSubmit={async (e) => {
                                    e.preventDefault();
                                    try {
                                        await login(email, password);
                                    } catch (error) {
                                        if (error.code === "auth/invalid-email") {
                                            setUser({ err: true, text: "Email Inválido!" })
                                            setPass({ err: false, text: "" })
                                        }
                                        else if (error.code === "auth/user-not-found") {
                                            setUser({ err: true, text: "Email não registrado!" });
                                            setPass({ err: false, text: "Senha Inválida!" })

                                        }
                                        else if (error.code === "auth/wrong-password") {
                                            setUser({ err: false, text: "" });
                                            setPass({ err: true, text: "Senha Inválida!" })
                                        }
                                        else {
                                            console.log(error)
                                            //setUser({ err: 1, text: "Muitas tentativas sem êxito, Por favor, tente mais tarde!" })
                                        }

                                    }
                                }}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={(e) => setEmail(e.target.value)}
                                        label="Email"
                                        error={user.err}
                                        helperText={user.text}

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
                                        error={pass.err}
                                        helperText={pass.text}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Mantenha-me conectado"
                                    />
                                    <Grid container direction="row" justify="flex-end">

                                        <Grid item>
                                            <RouterLink style={{ textDecoration: "none" }} to={REGISTER_ROUTE}>
                                                <Button
                                                    color="primary"
                                                >
                                                    Cadastre-se
                                                </Button>
                                            </RouterLink>
                                        </Grid>
                                        <Grid item> <Box width={"12px"} /></Grid>
                                        <Grid item> <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            Entrar
                                        </Button></Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs>
                                            <RouterLink to="/">
                                                <Link>
                                                    Esqueci minha senha
                                                </Link>
                                            </RouterLink>
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>
                        </Container>
                        <Box height={"12px"} />
                    </Card>
                </Grid>
            </Grid >
        </div>
    );
}
