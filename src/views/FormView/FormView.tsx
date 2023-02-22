import { Button, styled, TextField } from '@mui/material';
import { FormEventHandler, FunctionComponent, useState } from 'react';
import { useAppContext } from '../../hooks';

const PREFIX = 'form';
const classes = {
    root: `${PREFIX}-root`,
};
const Root = styled('form')(({ theme }) => ({
    [`&.${classes.root}`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        width: '100%', 
        maxWidth: '400px',
        height: 'min-content',
        backgroundColor: '#f1f1f1', 
        borderRadius: '15px',
        padding: 25,
        zIndex: 10,

        // Mobile Friendly
        [theme.breakpoints.down('sm')]: {
            borderRadius: '0',
            maxWidth: 'none',
            width: 'auto',
        },
    }
}));

interface IFormProps {

}
/**
 * Input IP address of the user, to determine where they are located. 
 * -- Optionally, set current time, to adjust background.
 * @param param0 
 * @returns 
 */
export const FormView: FunctionComponent<IFormProps> = ({
    ...rest
}) => {
    const {
        resources,
        date, 
        onDateChange,
        onFormSubmit,
    } = useAppContext();

    const [ip, setIp] = useState('');

    // Handle Form Submit
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e?.preventDefault();
        onFormSubmit(ip);
    };

    return (
        <Root
            className={classes.root}
            onSubmit={handleSubmit}
        >
            <TextField
                label={resources?.ipAddress || "IP Address"}
                variant="standard"
                value={ip}
                onChange={e => setIp(e.target.value)}
            />
            <TextField
                label={resources?.date || 'Date'}
                variant='standard'
                value={date}
                onChange={e => onDateChange(e.target.value)}
                type='date'
            />

            <Button
                color='primary'
                variant='contained'
                type='submit'
            >
                {resources?.find || 'Find'}
            </Button>
        </Root>
    )
}