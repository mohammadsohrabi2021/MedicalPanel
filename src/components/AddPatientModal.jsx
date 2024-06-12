import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'iran-sans',
  },
});

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '15px',
    padding: theme.spacing(2),
    backgroundColor: '#f9f9f9',
  },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& label': {
    right: 'unset',
    left: 0,
    transformOrigin: 'top left',
    direction: 'rtl',
  },
  '& label.Mui-focused': {
    color: 'red',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    direction: 'rtl', // راست‌چین کردن اینپوت
    '& fieldset': {
      borderColor: 'gray',
    },
    '&:hover fieldset': {
      borderColor: '#ececec',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'blue',
    },
    '& input': {
      textAlign: 'right', // راست‌چین کردن متن ورودی
    },
  },
  '& .MuiInputBase-input': {
    textAlign: 'right', // راست‌چین کردن متن ورودی
  },
  '& .MuiFormHelperText-root': {
    textAlign: 'right', // راست‌چین کردن متن کمکی
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.5),
  width: '150px',
  height: '40px',
  borderRadius: '10px',
  textTransform: 'none',
  fontWeight: 'bold',
  margin: "0 20px",
  color: '#fff',
  
  '&.MuiButton-containedPrimary': {
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: '#115293',
    },
  },
  '&.MuiButton-containedSecondary': {
    backgroundColor: '#d32f2f',
    '&:hover': {
      backgroundColor: '#9a0007',
    },
  },
}));

function AddPatientModal({ open, onClose, onAddPatient, initialData }) {
  const [patient, setPatient] = useState({ name: '', age: '', condition: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setPatient(initialData);
    } else {
      setPatient({ name: '', age: '', condition: '' });
    }
  }, [initialData, open]);

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = patient.name ? "" : "نام الزامی است.";
    tempErrors.age = patient.age ? "" : "سن الزامی است.";
    tempErrors.condition = patient.condition ? "" : "وضعیت پزشکی الزامی است.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleAdd = () => {
    if (validate()) {
      onAddPatient(patient);
      // toast.success(initialData ? 'بیمار با موفقیت ویرایش شد!' : 'بیمار با موفقیت افزوده شد!');
      setPatient({ name: '', age: '', condition: '' }); // Reset the form
      onClose(); // Close the modal after adding
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'age') {
      const newValue = value.replace(/[^\d]/g, ''); // فقط اعداد را قبول می‌کند
      setPatient({ ...patient, [name]: newValue });
    } else {
      setPatient({ ...patient, [name]: value });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CustomDialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>
          {initialData ? 'ویرایش بیمار' : 'افزودن بیمار جدید'}
        </DialogTitle>
        <DialogContent>
          <CustomTextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            placeholder="نام"
            type="text"
            fullWidth
            variant="outlined"
            value={patient.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <CustomTextField
            margin="dense"
            id="age"
            name="age"
            placeholder="سن"
            type="text"
            fullWidth
            variant="outlined"
            value={patient.age}
            onChange={handleChange}
            error={Boolean(errors.age)}
            helperText={errors.age}
          />
          <CustomTextField
            margin="dense"
            id="condition"
            name="condition"
            placeholder="وضعیت پزشکی"
            type="text"
            fullWidth
            variant="outlined"
            value={patient.condition}
            onChange={handleChange}
            error={Boolean(errors.condition)}
            helperText={errors.condition}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <CustomButton onClick={onClose} color="secondary" variant="contained">
            لغو
          </CustomButton>
          <CustomButton onClick={handleAdd} color="primary" variant="contained">
            {initialData ? 'ویرایش' : 'افزودن'}
          </CustomButton>
        </DialogActions>
      </CustomDialog>
    </ThemeProvider>
  );
}

export default AddPatientModal;
