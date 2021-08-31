import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const initialState = {
  isLoadingStudents: false,
  loadingStudentsError: null,
  students: [],
  studentsSort: { sort: null },
  studentsFilter: {},
  fields: [], // list of fields for dropdown
};

export const slice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    startLoadingStudents(state) {
      state.isLoadingStudents = true;
    },

    hasErrorLoadingStudents(state, action) {
      state.isLoadingStudents = false;
      state.loadingStudentsError = action.payload;
    },

    getStudentsSuccess(state, action) {
      const { students } = action.payload;

      state.isLoadingStudents = false;
      state.students = students;
    },

    addStudentSuccess(state, action) {
      const { student } = action.payload;
      state.students.push(student);
    },

    setStudentsSort(state, action) {
      state.studentsSort.sort = action.payload.sortBy;
    },

    setStudentsFilter(state, action) {
      const { filter } = action.payload;
      state.studentsFilter = filter;
    },

    setStudentsFields(state, action) {
      state.fields = action.payload.fields;
    },
  },
});

export default slice.reducer;

export const { setStudentsSort } = slice.actions;

export function getStudentsRange(filter, sort) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoadingStudents());
    try {
      const response = await api.get('/students', {
        params: {
          ...filter,
          ...sort,
        },
      });

      dispatch(
        slice.actions.getStudentsSuccess({
          students: response.data.data.doc,
        }),
      );
    } catch (error) {
      dispatch(slice.actions.hasErrorLoadingStudents(error));
    }
  };
}

// Create new Student
export function addStudent(info) {
  return async (dispatch) => {
    try {
      const response = await api.post('/students', info);

      dispatch(
        slice.actions.addStudentSuccess({
          student: response.data.data.doc,
        }),
      );
    } catch (error) {
      throw error;
    }
  };
}

// Get fields for dropdown
export function getFilterRange(property) {
  return async (dispatch) => {
    try {
      const response = await api.get('/students/fields', {
        params: {
          property,
        },
      });

      dispatch(
        slice.actions.setStudentsFields({
          fields: response.data.data.fields,
        }),
      );
    } catch (error) {
      dispatch(slice.actions.hasErrorLoadingStudents(error));
    }
  };
}

// Set sort
export function setSort(mode, field) {
  return async (dispatch) => {
    dispatch(
      slice.actions.setStudentsSort({
        sortBy: mode === 'asc' ? field : `-${field}`,
      }),
    );
  };
}

// Set filter
export function setFilter(key, value) {
  return async (dispatch) => {
    let filter = {};
    filter[key] = value;
    dispatch(
      slice.actions.setStudentsFilter({
        filter,
      }),
    );
  };
}
