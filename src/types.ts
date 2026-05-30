export type Language = 'EN' | 'AR';

export type SectionType = 'archive' | 'images' | 'videos' | 'reports' | 'documents' | 'cases' | 'museum';

export interface Category {
  id: string;
  nameEN: string;
  nameAR: string;
  code: string;
  descriptionEN: string;
  descriptionAR: string;
  itemCount: number;
}

export interface ArchiveItem {
  id: string;
  code: string; // e.g., IRTH-SA-1392
  titleEN: string;
  titleAR: string;
  type: 'image' | 'video' | 'document' | 'report' | 'relic';
  category: string; // matches Category.code
  dateCreated: string; // e.g., "1392 H / 1972 G"
  locationEN: string;
  locationAR: string;
  ownerEN: string;
  ownerAR: string;
  descriptionEN: string;
  descriptionAR: string;
  tagsEN: string[];
  tagsAR: string[];
  imageUrl: string;
  fileSize?: string;
  format?: string;
  isFeatured?: boolean;
}

export interface CaseStudy {
  id: string;
  titleEN: string;
  titleAR: string;
  clientEN: string;
  clientAR: string;
  year: string;
  summaryEN: string;
  summaryAR: string;
  outcomesEN: string[];
  outcomesAR: string[];
  imageUrl: string;
  category: string;
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'Administrator' | 'Archivist' | 'Viewer';
  status: 'Active' | 'Suspended' | 'Pending';
  departmentEN: string;
  departmentAR: string;
  lastActive: string;
}

export interface AuditLog {
  id: string;
  user: string;
  actionEN: string;
  actionAR: string;
  target: string;
  timestamp: string;
  status: 'Success' | 'Failed';
}

export interface SystemStats {
  totalItems: number;
  totalCategories: number;
  storageUsedGB: number;
  storageLimitGB: number;
  activeUsers: number;
}
