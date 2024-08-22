export interface ColorOptionsModel {
  class: string;
  value: string;
}

export interface MenuItemsModel {
  label: string;
  section: string;
}

export interface TechStackModel {
  [key: string]: string;
}

export interface TimelineItemModel {
  icon: string;
  title: string;
  content: string;
  year: string;
  right: boolean;
}

export interface ProjectModel {
  imageUrl: string;
  title: string;
  githubLink: string;
  demo: string;
  demoButton: string;
}


