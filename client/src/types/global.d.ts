import React from "react";

export {};

declare global {
  
  type RatingKeys = 'left' | 'main' | 'right';

  type RatingValues = {
    submit: boolean;
    valid: boolean;
    timestamp: null | string;
    blue: boolean;
    red: boolean;
    yellow: boolean;
    white: boolean;
  };

  type RatingObject = {
    left: RatingValues;
    main: RatingValues;
    right: RatingValues;
    timer: number
  } | null;
  
  type PropTypes = {
    ip: null | string;
    isConnected: boolean;
    rating: RatingObject;
  };

  type SettingsObject = {
    refMenu: boolean;
    autoReset: boolean;
    autoResetTimer: number;
  } | null;

  type RefObject = {
    _id: string;
    position: string;
    token: string;
    role: string;
  }

  type Method = 'POST' | 'GET';
}

declare module "react" {
  // augment CSSProperties here
  interface CSSProperties {
    "--value"?: number;
  }
}