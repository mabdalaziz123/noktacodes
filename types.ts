
import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}


export interface Recommendation {
  title: string;
  content: string;
  icon: string;
}

export interface BlogPost {
  t: string;
  d: string;
  date: string;
  img: string;
  content: string[]; // Array of paragraphs
}