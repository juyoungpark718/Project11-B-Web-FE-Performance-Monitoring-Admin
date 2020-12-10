import { Dispatch } from 'redux';
import _ from 'lodash';
import { IVisits, IMonthlyVisits, IDailyVisits } from '../types';

import service from '../service';

const SET_MONTHLY_VISITS = 'visits/SET_MONTHLY_VISITS' as const;
const SET_DAILY_VISITS = 'visits/SET_DAILY_VISITS' as const;

const setMonthlyVisitsAction = (newMonthlyVisits: IMonthlyVisits) => ({
  type: SET_MONTHLY_VISITS,
  monthlyVisits: newMonthlyVisits,
});

export const setMonthlyVisits = (projectId: string, year: number) => async (
  dispatch: Dispatch,
): Promise<void> => {
  const res = await service.getMonthlyVisits(projectId, year);
  const newMonthlyVisits = res.data;
  dispatch(setMonthlyVisitsAction(newMonthlyVisits));
};

const setDailyVisitsAction = (newDailyVisits: IDailyVisits) => ({
  type: SET_DAILY_VISITS,
  dailyVisits: newDailyVisits,
});

export const setDailyVisits = (projectId: string, year: number, month: number) => async (
  dispatch: Dispatch,
): Promise<void> => {
  const res = await service.getDailyVisits(projectId, year, month);
  const newDailyVisits = res.data;
  dispatch(setDailyVisitsAction(newDailyVisits));
};

type VisitsAction =
  | ReturnType<typeof setMonthlyVisitsAction>
  | ReturnType<typeof setDailyVisitsAction>;

/**
 * @TODO
 * dummy data를 어떻게 하지....???
 */
const visitsDummy: IVisits = {
  dailyVisits: {
    _id: {
      year: 1970,
      month: 1,
      date: 1,
    },
    count: 0,
  },
  monthlyVisits: {
    _id: {
      year: 1970,
      month: 1,
    },
    count: 0,
  },
};

function visits(state: IVisits = visitsDummy, action: VisitsAction): IVisits {
  switch (action.type) {
    case SET_MONTHLY_VISITS: {
      const newMonthlyVisits: IMonthlyVisits = action.monthlyVisits;
      const newVisits = _.cloneDeep(state);
      newVisits.monthlyVisits = newMonthlyVisits;
      return newVisits;
    }
    case SET_DAILY_VISITS: {
      const newDailyVisits: IDailyVisits = action.dailyVisits;
      const newVisits = _.cloneDeep(state);
      newVisits.dailyVisits = newDailyVisits;
      return newVisits;
    }
    default:
      return state;
  }
}

export default visits;
