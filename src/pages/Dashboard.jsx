import React, { useState, useEffect } from 'react';
import { Container, Box, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import PatientsGrid from '../components/PatientsGrid';
import AddPatientModal from '../components/AddPatientModal';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 64px; // ارتفاع تاپ بار
  transition: margin-right 0.3s ease; // انیمیشن برای تغییر موقعیت
  margin-right: ${({ sidebarOpen }) => (sidebarOpen ? '240px' : '0')};
`;

// const Content = styled(Box)`
//   flex-grow: 1;
//   padding: 20px;
//   border-radius: 10px;
//   margin-top: 60px;
//   box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
//   background-color: #f4f4f4;
//   transition: margin-right 0.3s ease; // انیمیشن برای تغییر موقعیت
//   margin-right: ${({ sidebarOpen }) => (sidebarOpen ? '240px' : '0')};
// `;

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);

  const addPatient = (newPatient) => {
    if (selectedPatient) {
      setPatients(patients.map(patient => patient.id === selectedPatient.id ? { ...newPatient, id: selectedPatient.id } : patient));
      toast.success(`بیمار ${newPatient.name} با موفقیت ویرایش شد!`);
    } else {
      setPatients([...patients, { ...newPatient, id: patients.length + 1 }]);
      toast.success(`بیمار ${newPatient.name} با موفقیت اضافه شد!`);
    }
    setSelectedPatient(null);
  };

  const deletePatient = (id) => {
    const patientToDelete = patients.find(patient => patient.id === id);
    setPatients(patients.filter(patient => patient.id !== id));
    toast.success(`بیمار ${patientToDelete.name} با موفقیت حذف شد!`);
  };

  const editPatient = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true); // باز کردن سایدبار در دسکتاپ به‌صورت پیش‌فرض
    }
  }, []);
  console.log(selectedPatient)
  return (
    <>
     {/* <ToastContainer/> */}
          <Button sx={{marginBottom:'30px'}} variant='contained' onClick={() => setIsModalOpen(true)} ><AddIcon/> افزودن بیمار جدید </Button>
          <PatientsGrid patients={patients} onDeletePatient={deletePatient} onEditPatient={editPatient} />

 
      <AddPatientModal open={isModalOpen} onClose={() => setIsModalOpen(false)}initialData={selectedPatient} onAddPatient={addPatient} />
    </>
  );
}

export default Dashboard;
