import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControl, InputLabel, Input, Button, Container, Card, CardContent, Typography, CircularProgress, Snackbar } from '@material-ui/core';
import { get, post } from '../utils/Fetch';
import { Fragment } from 'react';

const Home = () => {
    const [clientId, setClientId] = useState('');
    const [name, setName] = useState('');
    const [queue, setQueue] = useState([]);
    const [stateAlert, setStateAlert] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
        message: '',
      });

    var { vertical, horizontal, message, open } = stateAlert;
    var classes = useStyles();

    const showAlert = async (open, msj) => {
        if(open){
            setStateAlert({ ...stateAlert, open: open, message: msj });
        }else{
            setStateAlert({ ...stateAlert, open: false, message: '' });
        }
    }

    const getQueue = async () => {
        await get('Queue').then((items) => {
            items !== undefined ? setQueue(items) : setQueue([]);
        });
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        await post('Client', {'ClientId': clientId, 'Name': name}).then((items) => {
            if(items !== undefined || items !== null){
                getQueue(); showAlert(true, 'Se ha creado nueva persona!');
            }else{
                showAlert(true, 'Algo malo paso creando nueva persona!');
            }  
        });
    }

    useEffect(() => {
        getQueue();
    }, []);

    return (
        <Container>
            <Card className={classes.card}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={4}>
                            <Grid container justifyContent="center" spacing={0}>
                                <form onSubmit={handleSubmit}>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="clientId">Id</InputLabel>
                                        <Input
                                            id="clientId"
                                            name="clientId"
                                            type="text"
                                            autoComplete="text"
                                            autoFocus
                                            onChange={(event) => setClientId(event.target.value)}
                                            value={clientId}
                                        />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="name">Name</InputLabel>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="text"
                                            autoFocus
                                            onChange={(event) => setName(event.target.value)}
                                            value={name}
                                        />
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disabled={clientId !== '' && name !== '' ? false : true}
                                    >
                                        {'Guardar'}
                                    </Button>
                                </form>
                            </Grid>

                        </Grid>
                        <Grid item container xs={6}>
                            <Grid container justifyContent="center" spacing={2}>
                                {(Object.keys(queue)) ?
                                    <Fragment>
                                        {queue.map((key, item) => (
                                            <Card key={queue[item].id}>
                                                <CardContent>
                                                    <Typography>{queue[item].name}</Typography>
                                                    <Card>
                                                        <CardContent>
                                                            {queue[item].client.map((key, cl) => (
                                                                <Typography>{queue[item].client[cl].name}</Typography>
                                                            ))}
                                                        </CardContent>
                                                    </Card>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </Fragment>
                                :
                                <CircularProgress disableShrink style={{marginTop: '100px'}} />
                            }
                            </Grid>

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={() => showAlert(false, '')}
                message={message}
                key={vertical + horizontal}
                autoHideDuration={3000}
            />
        </Container>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    card:{
        minHeight:445,
        minWidth: 275,
        marginTop: 50
    }
}));

export default Home;