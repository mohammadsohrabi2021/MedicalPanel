import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddPatientModal from '../components/AddPatientModal';


const theme = createTheme({
//   direction: 'rtl',
  typography: {
    fontFamily: 'iran-sans',
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          fontFamily: 'iran-sans',
        },
      },
    },
  },
});

const localeText = {
  // Root
  noRowsLabel: 'بدون ردیف',
  noResultsOverlayLabel: 'نتیجه‌ای پیدا نشد',
  errorOverlayDefaultLabel: 'خطا',

  // Density selector toolbar button text
  toolbarDensity: 'تراکم',
  toolbarDensityLabel: 'تراکم',
  toolbarDensityCompact: 'فشرده',
  toolbarDensityStandard: 'استاندارد',
  toolbarDensityComfortable: 'راحت',

  // Columns selector toolbar button text
  toolbarColumns: 'ستون‌ها',
  toolbarColumnsLabel: 'انتخاب ستون‌ها',

  // Filters toolbar button text
  toolbarFilters: 'فیلتر‌ها',
  toolbarFiltersLabel: 'نمایش فیلترها',
  toolbarFiltersTooltipHide: 'پنهان کردن فیلتر',
  toolbarFiltersTooltipShow: 'نمایش فیلتر',
  toolbarFiltersTooltipActive: count => `${count} فیلتر فعال`,

  // Export selector toolbar button text
  toolbarExport: 'خروجی',
  toolbarExportLabel: 'خروجی',
  toolbarExportCSV: 'دانلود به فرمت CSV',
  toolbarExportPrint: 'چاپ',

  // Columns panel text
  columnsPanelTextFieldLabel: 'ستون جستجو',
  columnsPanelTextFieldPlaceholder: 'عنوان ستون',
  columnsPanelDragIconLabel: 'تنظیم مجدد ترتیب ستون',
  columnsPanelShowAllButton: 'نمایش همه',
  columnsPanelHideAllButton: 'پنهان‌سازی همه',

  // Filter panel text
  filterPanelAddFilter: 'افزودن فیلتر',
  filterPanelDeleteIconLabel: 'حذف',
  filterPanelOperators: 'عملگرها',
  filterPanelOperatorAnd: 'و',
  filterPanelOperatorOr: 'یا',
  filterPanelColumns: 'ستون‌ها',
  filterPanelInputLabel: 'مقدار',
  filterPanelInputPlaceholder: 'فیلتر مقدار',

  // Filter operators text
  filterOperatorContains: 'شامل',
  filterOperatorEquals: 'مساوی',
  filterOperatorStartsWith: 'شروع با',
  filterOperatorEndsWith: 'پایان با',
  filterOperatorIs: 'است',
  filterOperatorNot: 'نیست',
  filterOperatorAfter: 'بعد از',
  filterOperatorOnOrAfter: 'در یا بعد از',
  filterOperatorBefore: 'قبل از',
  filterOperatorOnOrBefore: 'در یا قبل از',
  filterOperatorIsEmpty: 'خالی است',
  filterOperatorIsNotEmpty: 'خالی نیست',
  filterOperatorIsAnyOf: 'یکی از',

  // Column menu text
  columnMenuLabel: 'منو',
  columnMenuShowColumns: 'نمایش ستون‌ها',
  columnMenuFilter: 'فیلتر',
  columnMenuHideColumn: 'پنهان کردن',
  columnMenuUnsort: 'لغو مرتب‌سازی',
  columnMenuSortAsc: 'مرتب‌سازی صعودی',
  columnMenuSortDesc: 'مرتب‌سازی نزولی',

  // Column header text
  columnHeaderFiltersTooltipActive: count => `${count} فیلتر فعال`,
  columnHeaderFiltersLabel: 'نمایش فیلترها',
  columnHeaderSortIconLabel: 'مرتب‌سازی',

  // Rows selected footer text
  footerRowSelected: count => `${count.toLocaleString()} ردیف انتخاب شده`,

  // Total rows footer text
  footerTotalRows: 'مجموع ردیف‌ها:',

  // Checkbox selection text
  checkboxSelectionHeaderName: 'انتخاب چک‌باکس',
  checkboxSelectionSelectAllRows: 'انتخاب همه ردیف‌ها',
  checkboxSelectionUnselectAllRows: 'لغو انتخاب همه ردیف‌ها',
  checkboxSelectionSelectRow: 'انتخاب ردیف',
  checkboxSelectionUnselectRow: 'لغو انتخاب ردیف',

  // Boolean cell text
  booleanCellTrueLabel: 'بله',
  booleanCellFalseLabel: 'خیر',

  // Actions cell more text
  actionsCellMore: 'بیشتر',

  // Used core components translation keys
  MuiTablePagination: {
    labelRowsPerPage: 'ردیف‌ها در هر صفحه:',
    labelDisplayedRows: ({ from, to, count }) =>
      `${from}–${to} از ${count !== -1 ? count : `بیش از ${to}`}`,
    firstPageLabel: 'اولین صفحه',
    previousPageLabel: 'صفحه قبل',
    nextPageLabel: 'صفحه بعد',
    lastPageLabel: 'آخرین صفحه',
  },
};

function PatientsGrid({ patients,onDeletePatient,onEditPatient }) {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleViewClick = (event, patient) => {
    event.stopPropagation();
    setSelectedPatient(patient);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (event, patient) => {
    event.stopPropagation();
    setSelectedPatient(patient);
    onEditPatient(patient);
  };

  const handleDeleteClick = (event, patient) => {
    event.stopPropagation();
    setSelectedPatient(patient);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    onDeletePatient(selectedPatient.id);
    closeModal();
  };

  const closeModal = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedPatient(null);
  };

  const columns = [
    { field: 'id', headerName: 'شناسه کاربری بیمار', width: 150 },
    { field: 'name', headerName: 'نام', width: 150 },
    { field: 'age', headerName: 'سن', width: 110 },
    { field: 'condition', headerName: 'وضعیت', width: 160 },
    {
      field: 'actions',
      headerName: 'عملیات',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleViewClick(event, params.row)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={(event) => handleEditClick(event, params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={(event) => handleDeleteClick(event, params.row)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={patients}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
          localeText={localeText}
        />
      </Box>

      <Modal open={isViewModalOpen} onClose={closeModal}>
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6">اطلاعات بیمار</Typography>
          {selectedPatient && (
            <>
              <Typography>نام: {selectedPatient.name}</Typography>
              <Typography>سن: {selectedPatient.age}</Typography>
              <Typography>وضعیت: {selectedPatient.condition}</Typography>
            </>
          )}
        </Box>
      </Modal>
      <Modal open={isDeleteModalOpen} onClose={closeModal}>
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6">تایید حذف</Typography>
          {selectedPatient && (
            <>
              <Typography>آیا مطمئن هستید که می‌خواهید بیمار {selectedPatient.name} را حذف کنید؟</Typography>
              <Button onClick={confirmDelete} color="primary" variant="contained">بله</Button>
              <Button onClick={closeModal} color="secondary" variant="contained">خیر</Button>
            </>
          )}
        </Box>
      </Modal>
      <AddPatientModal
        open={isEditModalOpen}
        onClose={closeModal}
        initialData={selectedPatient}
        onAddPatient={(updatedPatient) => {
          // اینجا باید لاجیک بروز رسانی بیمار را اضافه کنید
          // باید عملکرد ویرایش را در پدر کنترل کنید و از طریق props به این کامپوننت ارسال کنید
        }}
      />
    </ThemeProvider>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
export default PatientsGrid;

