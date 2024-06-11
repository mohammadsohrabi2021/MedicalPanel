import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const columns = [
  { field: 'id', headerName: 'شناسه کاربری بیمار', width: 150 },
  { field: 'name', headerName: 'نام', width: 150 },
  { field: 'age', headerName: 'سن', width: 110 },
  { field: 'condition', headerName: 'وضعیت', width: 160 },
];

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

function PatientsGrid({ patients }) {
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
    </ThemeProvider>
  );
}

export default PatientsGrid;

