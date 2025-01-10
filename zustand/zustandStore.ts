import { create } from "zustand";

export const useStore = create((set) => ({
  url: '',
  updateUrl: (newValue: any) => set({ url: newValue }),

  title: '',
  updateTitle: (newValue: any) => set({ title: newValue }),

  response: '',
  updateResponse: (newValue: any) => set({ response: newValue }),

  isInProModel: false,
  updateModel: (updateVal: any) => set({ isInProModel: updateVal }),
}));
