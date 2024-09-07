import { ActionSheetRef } from "react-native-actions-sheet";

export interface HeaderSectionProps {
    showActionSheet: () => void;
}

export interface TabMenuProps {
    activeTab: string;
    setActiveTab: (tab:string) => void;
}

export interface SwitchComponentProps {
    isEnabled : boolean;
    toggleSwitch: () => void;
}

export interface ListViewProps {
    cardItems: Array<any>; 
    navigation: any; 
  }
  
 
  export interface MapViewSectionProps {
    cardItems: Array<any>; 
    fullHeight: number;
    activeTab: string,
  }
  
  export interface DaySelectionModalProps {
    isModalVisible: boolean;
    setIsModalVisible: (visible: boolean) => void;
    daysOfWeek: string[];
    selectedDays: string[];
    toggleDaySelection: (day: string) => void;
  }

  export interface HomeTabScreenState {
    activeTab: string;
    isEnabled: boolean;
    cardItems: Array<any>; 
    isModalVisible: boolean;
    selectedDays: string[];
  }

  export interface FilterModalProps {
    filterSheetRef: React.RefObject<ActionSheetRef>;
  }
  