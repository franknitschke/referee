


  export type RatingKeys = "left" | "main" | "right";

  export type RatingValues = {
    submit: boolean;
    valid: boolean;
    timestamp: null | string;
    blue: boolean;
    red: boolean;
    yellow: boolean;
    white: boolean;
  };

  export type RatingObject = {
    left: RatingValues;
    main: RatingValues;
    right: RatingValues;
    timer: number;
  } | null;

  export type PropTypes = {
    ip: null | string;
    isConnected: boolean;
    rating: RatingObject;
  };

  export type SettingsObject = {
    refMenu: boolean;
    autoReset: boolean;
    autoResetTimer: number;
    hideCountdown: boolean;
    getVportalData: boolean;
    sendRating: boolean;
    isDocker: boolean;
    timekeeper: boolean;
    pauseModus: boolean;
  } | null;

  export type BreakTimerObject = {
    timer: number;
    note: string;
    defaultTimer: number;
  } | null;

  export type RefObject = {
    _id: string;
    position: string;
    token: string;
    role: string;
  };

  export type Method = "POST" | "GET";

