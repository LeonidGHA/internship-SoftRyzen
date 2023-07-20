import { store } from '../redux/store';

export interface Icons {
  [key: string]: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

export type FormInputsType = Record<string, string>;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface IReduxUser {
  id: number | null;
  firstName: string;
  avatar: string | null;
  direction: string | null;
  isLabelStream: boolean;
  isVerifiedEmail: boolean;
  roles: string[];
  stream: {
    streamDirection?: string;
    isActive?: boolean;
    startDate?: string;
  };
  test: {
    isSent: boolean;
    isSuccess: boolean;
    startDate: Date | null;
    endDate: Date | null;
  };
  task: {
    isSent: boolean;
    isSuccess: boolean;
    deadlineDate: Date | null;
  };
}

export interface IReduxAuthUser {
  refreshToken: string;
  accessToken: string;
  token: string;
  user: IReduxUser;
}

export interface ReduxUserState {
  refreshToken: string;
  accessToken: string;
  user: IReduxUser;
  forgotPassword: {
    emailForRecover: string;
    wasInstructionSent: boolean;
    wasChangedPassSent: boolean;
  };
  isLoggedIn: boolean;
  isLoading: boolean;
  isError: boolean | string | null | unknown;
}

export interface Test {
  id: number;
  createAt: string;
  updateAt: string;
  questionText: string;
  code: string | null;
  answers: string[];
  correctAnswerIndex: number;
  direction: string;
  blockQuestions: string;
  difficulty: string;
  points: number;
}

export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Block {
  title: string;
  points: number;
  AllQuestion: number | undefined;
}

export interface Direction {
  id: number;
  createAt: string;
  updateAt: string;
  direction: string;
  description: string;
  technologies: string[];
  ownerId: number;
  owner: string;
}

export type GetDirectionsResponse = Direction[];

export type TypeQuestionBlocks = {
  css?: number;
  html?: number;
  javascript?: number;
  react?: number;
  pm?: number;
  design?: number;
};
type TypeQuestionDifficulty = {
  easy: number;
  hard: number;
  medium: number;
};

export type DataTestsResponse = {
  availabilityEndDate: string;
  availabilityStartDate: string;
  createAt: string;
  duration: number;
  id: number;
  internshipStream: string;
  numberOfQuestions: number;
  passingScore: number;
  questionBlocks: TypeQuestionBlocks;
  questionDifficulty: TypeQuestionDifficulty;
  streamNumber: number;
  updateAt: string;
};

export interface CastingCardData {
  key: 'test' | 'task' | 'interview' | 'offer';
  title: string;
  textContent: {
    [index: string]: string;
  };
  linkContent: string;
  buttonText: string;
  subText: string;
}
