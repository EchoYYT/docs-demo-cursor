import React, { createContext, useReducer, useContext, ReactNode } from 'react';

export type Trigger = {
  type: string;
  config: any;
};

export type Condition = {
  id: string;
  field: string;
  operator: string;
  value: any;
};

export type Action = {
  id: string;
  type: string;
  config: any;
};

export interface AutomationItem {
  id: string;
  name: string;
  enabled: boolean;
  trigger: Trigger | null;
  conditions: Condition[];
  actions: Action[];
}

export interface AutomationState {
  automations: AutomationItem[];
  activeId: string | null;
}

const initialState: AutomationState = {
  automations: [],
  activeId: null,
};

type ActionType =
  | { type: 'ADD_AUTOMATION'; automation: AutomationItem }
  | { type: 'UPDATE_AUTOMATION'; id: string; automation: Partial<AutomationItem> }
  | { type: 'DELETE_AUTOMATION'; id: string }
  | { type: 'SET_ACTIVE'; id: string | null }
  | { type: 'TOGGLE_AUTOMATION'; id: string; enabled: boolean };

function automationReducer(state: AutomationState, action: ActionType): AutomationState {
  switch (action.type) {
    case 'ADD_AUTOMATION':
      return { ...state, automations: [...state.automations, action.automation], activeId: action.automation.id };
    case 'UPDATE_AUTOMATION':
      return {
        ...state,
        automations: state.automations.map(a => a.id === action.id ? { ...a, ...action.automation } : a),
      };
    case 'DELETE_AUTOMATION':
      return {
        ...state,
        automations: state.automations.filter(a => a.id !== action.id),
        activeId: state.activeId === action.id ? null : state.activeId,
      };
    case 'SET_ACTIVE':
      return { ...state, activeId: action.id };
    case 'TOGGLE_AUTOMATION':
      return {
        ...state,
        automations: state.automations.map(a => a.id === action.id ? { ...a, enabled: action.enabled } : a),
      };
    default:
      return state;
  }
}

const AutomationContext = createContext<{
  state: AutomationState;
  dispatch: React.Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => {} });

export function useAutomation() {
  return useContext(AutomationContext);
}

export function AutomationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(automationReducer, initialState);
  return (
    <AutomationContext.Provider value={{ state, dispatch }}>
      {children}
    </AutomationContext.Provider>
  );
} 