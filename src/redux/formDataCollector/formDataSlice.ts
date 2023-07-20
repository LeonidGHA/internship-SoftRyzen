import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { FormInputsType as ContactDataType } from 'modules/forms/ContactForm';
import type { FormInputsType as ExperienceDataType } from 'modules/forms/ExperienceForm';
import type { FormInputsType as SkillDataType } from 'modules/forms/SkillsForm';

export type FormInputsType = ContactDataType &
  SkillDataType &
  ExperienceDataType & { direction: string };

export type FormDataType = {
  formData: FormInputsType;
  step: number;
};

const initialState: FormDataType = {
  formData: {
    firstName: '',
    lastName: '',
    currentCity: '',
    telegramContact: '',
    phone: '',
    linkedinUrl: '',
    desiredSalary: '',
    education: '',
    englishLevel: '',
    haveProjects: '',
    resumeUrl: '',
    whatProjectsInterested: '',
    whyAreYou: '',
    isDataProcessingConsent: false,
    direction: '',
  },
  step: 1,
};

const formDataSlice = createSlice({
  name: 'formCollector',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<FormInputsType>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    updateCollectorStep: (state, { payload }: { payload: number }) => {
      state.step = payload;
    },
  },
});

export const { updateFormData, updateCollectorStep } = formDataSlice.actions;

export const formDataReducer = formDataSlice.reducer;
