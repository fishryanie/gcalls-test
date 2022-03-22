import '../scss/index.scss'
import 'react-toastify/dist/ReactToastify.css';
import JsSIP from "jssip";
import useScriptRef from '../hooks/useScriptRef';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Formik } from 'formik';
import { displayNameSchema, registerScheme, phoneNumberSchema } from '../utils/validator';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react'
import { PersonAdd } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import {
  Switch,
  Badge,
  Avatar,
  FormLabel,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
  Paper,
  Button,
  StepContent,
  StepLabel,
  Step,
  Stepper,
  Box,
  Select,
} from '@mui/material';

import { 
  IconLogout, 
  IconSettings, 
  IconMicrophone, 
  IconGridDots, 
  IconVolume, 
  IconPlus, 
  IconVideoOff, 
  IconUserCircle, 
  IconPhone 
} from '@tabler/icons';






export default function MainLayout() {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const [ btnCall, setShowBtnCall] = useState({display: 'none'})
  const [ activeStep, setActiveStep ] = useState(0);
  const [ anchorEl, setAnchorEl] = useState(null);
  const [ showCall, setShowCall ] = useState({display: 'none'})
  const [connected, setConnected] = useState('orange')
  const [data, setData] = useState({
    sipURL: '',
    sipPassword: '',
    webSocket:  '',
    displayName: '',
    phoneNumber: '',
    
  })
  const openToat = string => {
    toast.success( string, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const openToatError = (string) => { 
    toast.error( string, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const Call = (first) => `sip:${first}@2-test1.gcalls.vn:50061`

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: connected,
      color: connected,
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: -1,
        left: -1,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
  
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
 

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleLogOut = () => { 
    setConnected('orange')
    setActiveStep(0);
    setData({  
      sipURL: '',
      sipPassword: '',
      webSocket:  '',
      displayName: '',
      phoneNumber: '',
    })
  }

  var ua, configuration
  const onSubmitUserName = () => { 
    return async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        console.log(scriptedRef.current)
        if (scriptedRef.current) {
          setStatus({ success: true });
          setSubmitting(false);
          setData((data)=>({...data, displayName: values.displayname}))
          setActiveStep(activeStep + 1)
         
        }
      } catch (err) {
        console.error(err);
        if (scriptedRef.current) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      } finally {
        console.log('values', values)
      }
    }
  }
  const onSubmitForm = () => { 
    return async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        console.log(scriptedRef.current)
        if (scriptedRef.current) {
          setStatus({ success: true });
          setSubmitting(false);
          setActiveStep(activeStep + 1)
          setData((data)=>({
            ...data,
            sipURL: values.sipURL, 
            webSocket: values.webSocket, 
            sipPassword:values.sipPassword
          }))
         
        }
      } catch (err) {
        console.error(err);
        if (scriptedRef.current) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      } finally {
        console.log('values', values)
      }
    }
  }

  
 
  const onSubmitPhoneNumber = () => { 
    return async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        if (scriptedRef.current) {
          setStatus({ success: true });
          setSubmitting(false);
          setData((data)=>({...data, phoneNumber: values.phoneNumber}))
          setActiveStep(activeStep + 1)
          setShowBtnCall({display:'block'})
        }
      } catch (err) {
        console.error(err);
        if (scriptedRef.current) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      } finally {
        console.log('values', values)
      }
    }
  }

  console.log(data)


  const OutLineInput = (id, type, label, field, error, touched, onBlur, onChange, value) => (
    <FormControl fullWidth error={Boolean(touched && error)} 
      sx={{ ...theme.typography.customInput, mb:2, mt:2, maxWidth: '100%' }}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        type={type}
        value={value}
        name={field}
        onBlur={onBlur}
        onChange={onChange}
        label={label}
        inputProps={{}}
      />
      {touched && error && (
        <FormHelperText error id="standard-weight-helper-text-email-login">
          {error}
        </FormHelperText>
      )}
    </FormControl>
  )


  const [openDialog, setOpenDialog] = useState(false);
  const [scrollDialog, setScrollDialog] = useState('paper');

  const handleClickOpenDialog = (scrollType) => () => {
    setOpenDialog(true);
    setScrollDialog(scrollType);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (openDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openDialog]);


  useEffect(() => { 
    if(data.phoneNumber !== '') {
      localStorage.setItem('data', JSON.stringify(data))
    }
  },[data.phoneNumber])

  const func = () => { 
    configuration = {
      sockets: new JsSIP.WebSocketInterface(data.webSocket),
      uri: Call(data.sipURL),
      password: data.sipPassword,
      'session_timers': false,
    }
    ua = new JsSIP.UA(configuration);
    ua.start()
    ua.on('connected', ()=> {
      const text = 'connecting to WebSocket ' + data.webSocket 
      openToat(text);
      console.log(text)
    });
    ua.on('disconnected', ()=> {
      const text = 'disconnected to WebSocket' + data.webSocket
      console.log(text)
      openToatError(text)
    });
    ua.on('registered', ()=> {
      setConnected('green'); 
      openToat('Register Succsessfully !') ;
      console.log('registered')
    });
    ua.on('unregistered', ()=> {
      openToatError('unregistered')
      console.log('unregistered')
    });
    ua.on('registrationFailed', ()=> {
      openToatError('registrationFailed')
      console.log('registrationFailed')
    });
    ua.on('newRTCSession', ()=> console.log('registrationFailed'));
    ua.on('newMessage', ()=>console.log('newMessage'));
    return ua
  }

  useEffect(() => { 
    if(data.sipURL !== '' && data.sipPassword !== '' && data.webSocket !== ''){
      try {
        func()
      } catch (error) {
        openToatError('Connect faild pls check url and password')
        console.log(error)
      }
    }
  },[data.sipURL, data.sipPassword, data.webSocket])


  const eventHandlers = {
    progress: function (e) {
      openToatError('call is in progress')
      console.log("call is in progress: ", e);
    },
    failed: function (e) {
      openToatError('call failed')
      console.log("call failed with cause: " , e );
    },
    ended: function (e) {
      openToatError('call ended with cause')
      console.log("call ended with cause: " , e);
    },
    confirmed: function (e) {
      alert('call success')
      console.log("call confirmed", e);
    }
  };

  const options = {
    eventHandlers: eventHandlers,
    mediaConstraints: { audio: true, video: false }
  };
  return (
    <section className='main-layout'>
      <div className="card" data-state="#about">
        <div className='card-call-overplay' style={showCall}>
          <h3>{data.phoneNumber}</h3>
          <p><div className='icon-phone'>
            <svg xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 480.56 480.56">
              <path className="path1" d="M365.35 317.9c-15.7-15.5-35.3-15.5-50.9 0-11.9 11.8-23.8 23.6-35.5 35.6-3.2 3.3-5.9 4-9.8 1.8-7.7-4.2-15.9-7.6-23.3-12.2-34.5-21.7-63.4-49.6-89-81-12.7-15.6-24-32.3-31.9-51.1-1.6-3.8-1.3-6.3 1.8-9.4 11.9-11.5 23.5-23.3 35.2-35.1 16.3-16.4 16.3-35.6-.1-52.1-9.3-9.4-18.6-18.6-27.9-28-9.6-9.6-19.1-19.3-28.8-28.8-15.7-15.3-35.3-15.3-50.9.1-12 11.8-23.5 23.9-35.7 35.5-11.3 10.7-17 23.8-18.2 39.1-1.9 24.9 4.2 48.4 12.8 71.3 17.6 47.4 44.4 89.5 76.9 128.1 43.9 52.2 96.3 93.5 157.6 123.3 27.6 13.4 56.2 23.7 87.3 25.4 21.4 1.2 40-4.2 54.9-20.9 10.2-11.4 21.7-21.8 32.5-32.7 16-16.2 16.1-35.8.2-51.8-19-19.1-38.1-38.1-57.2-57.1z" />
              <path className="path2" d="M346.25 238.2l36.9-6.3c-5.8-33.9-21.8-64.6-46.1-89a164.03 164.03 0 0 0-94-46.9l-5.2 37.1c27.7 3.9 52.9 16.4 72.8 36.3 18.8 18.8 31.1 42.6 35.6 68.8z" />
              <path className="path3" d="M403.95 77.8c-42.6-42.6-96.5-69.5-156-77.8l-5.2 37.1c51.4 7.2 98 30.5 134.8 67.2 34.9 34.9 57.8 79 66.1 127.5l36.9-6.3c-9.7-56.2-36.2-107.2-76.6-147.7z" />
            </svg>
          </div>Calling . . . </p>
          <div className='row-icon'>
            <IconMicrophone className='icon' stroke={1.5} size="1.6rem"/>
            <IconGridDots className='icon' stroke={1.5} size="1.6rem" />
            <IconVolume className='icon' stroke={1.5} size="1.6rem" />
          </div>
          <div className='row-icon'>
            <IconPlus className='icon' stroke={1.5} size="1.6rem"/>
            <IconVideoOff className='icon' stroke={1.5} size="1.6rem" />
            <IconUserCircle className='icon' stroke={1.5} size="1.6rem" />
          </div>
          <div className='hangUp'><IconPhone className='hangUp-icon' stroke={1.5} size="1.6rem"
            onClick={()=>{
            ua?.stop()
            setShowCall({display:'none'})
            }}/>
          </div>
        </div>
        <div className="card-main">
        <Box sx={{ display: 'flex', alignItems:'center', justifyContent: 'flex-end'}} >
          <Typography>{data.displayName}</Typography>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar alt="Remy Sharp" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
              </StyledBadge>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClickOpenDialog('paper')}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon >
            <IconSettings stroke={1.5} size="1.6rem" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <IconLogout stroke={1.5} size="1.6rem"  />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    <PerfectScrollbar style={{maxHeight: '100%', overflowX: 'hidden'}}>
      <Box sx={{width:450, maxWidth: '100%' }}>

        <Stepper activeStep={activeStep} orientation="vertical">

          <Step>
            <StepLabel>Enter your display name</StepLabel>
            <StepContent>
              <Formik onSubmit={onSubmitUserName()} initialValues={{displayname:''}} validationSchema={displayNameSchema} >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                  <form noValidate onSubmit={handleSubmit}>
                    {OutLineInput('outlined-displayName', 'text', 'Display Name', 'displayname', errors.displayname, touched.displayname, handleBlur ,handleChange, values.displayname)}
                    {errors.submit && (
                      <Box sx={{ mt: 3 }}>
                        <FormHelperText error>{errors.submit}</FormHelperText>
                      </Box>
                    )}
                      <Box>
                       <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ mt: 1, mr: 1 }}>Continue</Button>
                       <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>Back</Button>
                     </Box>
                  </form>
                )}
              </Formik>
          
            </StepContent>
          </Step>

          <Step>
            <StepLabel>Register account</StepLabel>
            <StepContent>
            <Formik onSubmit={onSubmitForm()} initialValues={{sipURL:'',sipPassword:'',webSocket:''}} validationSchema={registerScheme} >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
                {OutLineInput('outlined-sipURL', 'text', 'SIP URL', 'sipURL', errors.sipURL, touched.sipURL, handleBlur ,handleChange, values.sipURL)}
                {OutLineInput('outlined-sipPassword', 'text', 'SIP password', 'sipPassword', errors.sipPassword, touched.sipPassword, handleBlur ,handleChange, values.sipPassword)}
                {OutLineInput('outlined-webSocket', 'text', 'WebSocket URL', 'webSocket', errors.webSocket, touched.webSocket, handleBlur ,handleChange, values.webSocket)}
                <FormControl fullWidth sx={{maxWidth:'100%', mb:2, mt:2}}>
                  <InputLabel id="via-tranport">Via tranport</InputLabel>
                  <Select
                    labelId="via-tranport"
                    id="id-via-tranport"
                    name='viaTranport'
                    label="Via tranport"
                    value={values.viaTranport}
                    onChange={handleChange}
                  >
                    <MenuItem value='auto'>auto</MenuItem>
                    <MenuItem value='TCP'>TCP</MenuItem>
                    <MenuItem value='TLS'>TLS</MenuItem>
                    <MenuItem value='WS'>WS</MenuItem>
                    <MenuItem value='WSS'>WSS</MenuItem>
                  </Select>
                </FormControl >
                {OutLineInput('outlined-registrar', 'text', 'Registrar server', 'registrar', errors.registrar, touched.registrar, handleBlur ,handleChange, values.registrar)}
                {OutLineInput('outlined-contact', 'text', 'Contact URL', 'contactURL', errors.contactURL, touched.contactURL, handleBlur ,handleChange, values.contactURL)}
                {OutLineInput('outlined-displayName', 'text', 'Authurization user', 'authurization', errors.authurization, touched.authurization, handleBlur ,handleChange, values.authurization)}
                {OutLineInput('outlined-displayName', 'text', 'Instance ID', 'instanceId', errors.instanceId, touched.instanceId, handleBlur ,handleChange, values.instanceId)}
                <FormControl component="fieldset" variant="standard" sx={{maxWidth:'100%', mb:2, mt:2}}>
                  <FormLabel component="legend">Session Timers</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      label="Enable Session Timers as per RFC 4028"
                      control={
                        <Switch onChange={handleChange} name="sessiontimers" />
                      }
                    />
                  </FormGroup>
                </FormControl>

                <FormControl component="fieldset" variant="standard" sx={{maxWidth:'100%', mb:2, mt:2}}>
                  <FormLabel component="legend">Preloaded Route</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      label="Add a Route header with the server URI"
                      control={
                        <Switch onChange={handleChange} name="preloaded" />
                      }
                    />
                  </FormGroup>
                </FormControl>
          
          
              <Box>
                <Button disableElevation type="submit" variant="contained" disabled={isSubmitting} sx={{ mt: 1, mr: 1 }}>Next</Button>
                <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>Back</Button>
              </Box>
              </form>
          )}
        </Formik>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>Enter your phone number</StepLabel>
            <StepContent>
            <Formik onSubmit={onSubmitPhoneNumber()} initialValues={{phoneNumber:''}} validationSchema={phoneNumberSchema} >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                  <form noValidate onSubmit={handleSubmit}>
                    {OutLineInput('outlined-phoneNumber', 'text', 'Phone number', 'phoneNumber', errors.phoneNumber, touched.phoneNumber, handleBlur ,handleChange, values.phoneNumber)}
                    {errors.submit && (
                      <Box sx={{ mt: 3 }}>
                        <FormHelperText error>{errors.submit}</FormHelperText>
                      </Box>
                    )}
                      <Box>
                       <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ mt: 1, mr: 1 }}>Next</Button>
                       <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>Back</Button>
                     </Box>
                  </form>
                )}
              </Formik>
            </StepContent>
          </Step>

      </Stepper>
      <Paper style={btnCall} square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button sx={{ mt: 1, mr: 1 }} onClick={()=>{
            func().call(Call(data.phoneNumber, options))
            
            console.log('call', func())
            console.log(configuration?.sockets)
            console.log(configuration?.uri)
            console.log(configuration?.password)
            console.log(Call(data.phoneNumber))
            setTimeout(() => { 
              if(ua === undefined){
                openToatError('Call Fail')
              }else{
                setShowCall({display:'block'})
              }
            },500)
          }}>
            Call
          </Button>
        </Paper>
    </Box>
    </PerfectScrollbar>
        </div>
      </div>


      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
{/* Same as */}
<ToastContainer />

    </section>
  )
}
