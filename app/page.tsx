'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  Upload, 
  ChevronRight, 
  Plus, 
  BookOpen, 
  IndianRupee, 
  Clock, 
  Compass, 
  GraduationCap, 
  Trash2, 
  Search, 
  Sparkles, 
  Info, 
  CheckCircle2, 
  BookMarked,
  SlidersHorizontal,
  X,
  Edit2,
  LayoutGrid,
  List as ListIcon,
  Users
} from 'lucide-react';

// Emblem/Preset Logos structure for pristine branding choice
interface LogoPreset {
  id: string;
  name: string;
  colorClass: string;
  bgClass: string;
  icon: React.ReactNode;
}

// Course details structure
interface Course {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  fees: number;
  description: string;
  curriculum: string[];
  createdAt: string;
}

// Leads detail structure
interface Lead {
  id: string;
  name: string;
  date: string; // ISO string
  course: string;
  source: string;
  address: string;
  phone: string;
  followUp: string; // ISO string or specific date string
  status: 'New' | 'Contacted' | 'Converted' | 'Lost';
}

// Institute Onboarding Details
interface InstituteInfo {
  name: string;
  address: string;
  email: string;
  phone: string;
  estbYear: string;
  logoType: 'upload' | 'preset';
  logoPresetId?: string;
  logoPresetColor?: string;
  logoDataUrl?: string; // If uploaded
}

// Let's create the default presets for logos
const LOGO_PRESETS = [
  {
    id: 'shield',
    name: 'Athena Shield',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 border-emerald-200',
    svg: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    )
  },
  {
    id: 'laurel',
    name: 'Birch Academy',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50 border-indigo-200',
    svg: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M12 20.904V10.8" />
      </svg>
    )
  },
  {
    id: 'globe',
    name: 'Sovereign Beacon',
    color: 'text-amber-600',
    bg: 'bg-amber-50 border-amber-200',
    svg: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
      </svg>
    )
  },
  {
    id: 'book',
    name: 'Scholarly Quill',
    color: 'text-rose-600',
    bg: 'bg-rose-50 border-rose-200',
    svg: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    )
  },
  {
    id: 'crown',
    name: 'Dynastic Star',
    color: 'text-teal-600',
    bg: 'bg-teal-50 border-teal-200',
    svg: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.195-.572.95-.572 1.144 0l1.815 5.334a1.125 1.125 0 001.07.765h5.367c.607 0 .86.784.372 1.152l-4.343 3.27a1.125 1.125 0 00-.41 1.229l1.814 5.334c.196.572-.45 1.05-.94.693l-4.343-3.27a1.125 1.125 0 00-1.28 0l-4.343 3.27c-.49.357-1.136-.12-1.07-1.229l1.814-5.334a1.125 1.125 0 00-.41-1.229L2.34 11.75c-.488-.368-.235-1.152.372-1.152h5.368c.599 0 1.072-.442 1.07-.765L11.48 3.5z" />
      </svg>
    )
  }
];

// Seed/sample mock courses in case they want a quick bootstrap

export default function Page() {
  // --- Persistent Local States ---
  const [isClient, setIsClient] = React.useState(false);
  const [institute, setInstitute] = React.useState<InstituteInfo | null>(null);
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [leads, setLeads] = React.useState<Lead[]>([]);
  
  // Navigation states: 'overview' | 'courses' | 'leads'
  const [activeTab, setActiveTab] = React.useState<'overview' | 'courses' | 'leads'>('overview');
  const [showAddCourse, setShowAddCourse] = React.useState(false);
  const [showAddLead, setShowAddLead] = React.useState(false);
  
  // Search & Filters state
  const [searchQuery, setSearchQuery] = React.useState('');
  const [levelFilter, setLevelFilter] = React.useState<string>('all');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [leadSearchQuery, setLeadSearchQuery] = React.useState('');
  const [leadStatusFilter, setLeadStatusFilter] = React.useState<string>('all');
  
  // Selected course details modal view
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(null);

  // --- Onboarding Wizard States ---
  const [obName, setObName] = React.useState('');
  const [obAddress, setObAddress] = React.useState('');
  const [obEmail, setObEmail] = React.useState('');
  const [obPhone, setObPhone] = React.useState('');
  const [obEstb, setObEstb] = React.useState('2020');
  const [obLogoType, setObLogoType] = React.useState<'preset' | 'upload'>('preset');
  const [selectedPresetId, setSelectedPresetId] = React.useState('shield');
  const [obDataUrl, setObDataUrl] = React.useState<string | undefined>(undefined);
  const [dragActive, setDragActive] = React.useState(false);
  const [onboardingError, setOnboardingError] = React.useState('');

  // --- Course Creation Form States ---
  const [newCourseName, setNewCourseName] = React.useState('');
  const [newCourseLevel, setNewCourseLevel] = React.useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [newCourseDuration, setNewCourseDuration] = React.useState('');
  const [newCourseFees, setNewCourseFees] = React.useState('');
  const [newCourseDesc, setNewCourseDesc] = React.useState('');
  const [curriculumInput, setCurriculumInput] = React.useState('');
  const [curriculumList, setCurriculumList] = React.useState<string[]>([]);
  const [courseSubmitError, setCourseSubmitError] = React.useState('');
  const [courseSubmitSuccess, setCourseSubmitSuccess] = React.useState(false);

  // --- Lead Creation Form States ---
  const [newLeadName, setNewLeadName] = React.useState('');
  const [newLeadCourse, setNewLeadCourse] = React.useState('');
  const [newLeadSource, setNewLeadSource] = React.useState('Website');
  const [newLeadAddress, setNewLeadAddress] = React.useState('');
  const [newLeadPhone, setNewLeadPhone] = React.useState('');
  const [newLeadFollowUp, setNewLeadFollowUp] = React.useState('');
  const [newLeadStatus, setNewLeadStatus] = React.useState<'New' | 'Contacted' | 'Converted' | 'Lost'>('New');
  const [leadSubmitError, setLeadSubmitError] = React.useState('');
  const [leadSubmitSuccess, setLeadSubmitSuccess] = React.useState(false);

  // Ensure hydration compliance
  React.useEffect(() => {
    // Load state from local storage
    const savedInstitute = localStorage.getItem('institute_info');
    let parsedInst: InstituteInfo | null = null;
    if (savedInstitute) {
      try {
        parsedInst = JSON.parse(savedInstitute);
      } catch (e) {
        console.error('Failed parsing saving institute info', e);
      }
    }
    
    const savedCourses = localStorage.getItem('institute_courses');
    let parsedCourses: Course[] = [];
    let hasSavedCourses = false;
    if (savedCourses) {
      try {
        parsedCourses = JSON.parse(savedCourses);
        hasSavedCourses = true;
      } catch (e) {
        console.error('Failed parsing courses', e);
      }
    }

    const savedLeads = localStorage.getItem('institute_leads');
    let parsedLeads: Lead[] = [];
    let hasSavedLeads = false;
    if (savedLeads) {
      try {
        parsedLeads = JSON.parse(savedLeads);
        hasSavedLeads = true;
      } catch (e) {
        console.error('Failed parsing leads', e);
      }
    }

    // Defer state updates to avoid synchronous setState calls in layout effects
    Promise.resolve().then(() => {
      setIsClient(true);
      if (parsedInst) {
        setInstitute(parsedInst);
      }
      if (hasSavedCourses) {
        setCourses(parsedCourses);
      } else {
        setCourses([]);
      }
      if (hasSavedLeads) {
        setLeads(parsedLeads);
      } else {
        setLeads([]);
      }
    });
  }, []);

  // Sync state helpers
  const saveInstituteToStorage = (info: InstituteInfo | null) => {
    setInstitute(info);
    if (info === null) {
      localStorage.removeItem('institute_info');
    } else {
      localStorage.setItem('institute_info', JSON.stringify(info));
    }
  };

  const saveCoursesToStorage = (updatedCourses: Course[]) => {
    setCourses(updatedCourses);
    localStorage.setItem('institute_courses', JSON.stringify(updatedCourses));
  };

  const saveLeadsToStorage = (updatedLeads: Lead[]) => {
    setLeads(updatedLeads);
    localStorage.setItem('institute_leads', JSON.stringify(updatedLeads));
  };

  // --- Logo Upload Drag/Drop handlers ---
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setObDataUrl(event.target.result as string);
          setObLogoType('upload');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // --- Onboarding Submit Action ---
  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOnboardingError('');

    if (!obName.trim()) {
      setOnboardingError('Please provide a valid institute name.');
      return;
    }
    if (!obAddress.trim()) {
      setOnboardingError('Please provide the physical address.');
      return;
    }
    if (!obEmail.trim() || !obEmail.includes('@')) {
      setOnboardingError('Please enter a valid administrative email.');
      return;
    }
    if (!obPhone.trim()) {
      setOnboardingError('Please enter a contact desk number.');
      return;
    }
    if (!obEstb || isNaN(Number(obEstb))) {
      setOnboardingError('Please specify a valid established year.');
      return;
    }

    const newInst: InstituteInfo = {
      name: obName.trim(),
      address: obAddress.trim(),
      email: obEmail.trim(),
      phone: obPhone.trim(),
      estbYear: obEstb,
      logoType: obLogoType,
      logoPresetId: obLogoType === 'preset' ? selectedPresetId : undefined,
      logoDataUrl: obLogoType === 'upload' ? obDataUrl : undefined,
    };

    saveInstituteToStorage(newInst);
    
    setActiveTab('overview');
  };

  // --- New Course Submission ---
  const handleAddCurriculumItem = () => {
    if (curriculumInput.trim()) {
      setCurriculumList(prev => [...prev, curriculumInput.trim()]);
      setCurriculumInput('');
    }
  };

  const handleRemoveCurriculumItem = (index: number) => {
    setCurriculumList(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setCourseSubmitError('');
    setCourseSubmitSuccess(false);

    if (!newCourseName.trim()) {
      setCourseSubmitError('Course name is strictly required.');
      return;
    }
    if (!newCourseDuration.trim()) {
      setCourseSubmitError('Please specify a duration (e.g. "12 Weeks", "1 Year").');
      return;
    }
    if (!newCourseFees || Number(newCourseFees) <= 0) {
      setCourseSubmitError('Please enter a valid course numeric fee.');
      return;
    }
    if (!newCourseDesc.trim()) {
      setCourseSubmitError('A brief course description aids onboards.');
      return;
    }
    if (curriculumList.length === 0) {
      setCourseSubmitError('Please append at least one topic, chapter or module into the curriculum index.');
      return;
    }

    const created: Course = {
      id: 'course-' + Date.now(),
      name: newCourseName.trim(),
      level: newCourseLevel,
      duration: newCourseDuration.trim(),
      fees: Number(newCourseFees),
      description: newCourseDesc.trim(),
      curriculum: [...curriculumList],
      createdAt: new Date().toISOString()
    };

    const updated = [created, ...courses];
    saveCoursesToStorage(updated);

    // Reset fields
    setNewCourseName('');
    setNewCourseLevel('Beginner');
    setNewCourseDuration('');
    setNewCourseFees('');
    setNewCourseDesc('');
    setCurriculumList([]);
    
    setCourseSubmitSuccess(true);
    // Automatically transition back to course log directory after showing success
    setTimeout(() => {
      setCourseSubmitSuccess(false);
      setShowAddCourse(false);
    }, 1500);
  };

  const handleDeleteCourse = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = courses.filter(c => c.id !== id);
    saveCoursesToStorage(updated);
    if (selectedCourse?.id === id) {
      setSelectedCourse(null);
    }
  };

  const handleAddLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitError('');
    
    if (!newLeadName.trim()) {
      setLeadSubmitError('Please enter candidate name.');
      return;
    }
    if (!newLeadPhone.trim()) {
      setLeadSubmitError('Please provide a contact number.');
      return;
    }

    const createdLead: Lead = {
      id: 'lead-' + Date.now(),
      name: newLeadName.trim(),
      date: new Date().toISOString(),
      course: newLeadCourse.trim(),
      source: newLeadSource,
      address: newLeadAddress.trim(),
      phone: newLeadPhone.trim(),
      followUp: newLeadFollowUp || new Date().toISOString(), // Defaults to now if not provided
      status: newLeadStatus
    };

    const updated = [createdLead, ...leads];
    saveLeadsToStorage(updated);

    // Reset Fields
    setNewLeadName('');
    setNewLeadCourse('');
    setNewLeadSource('Website');
    setNewLeadAddress('');
    setNewLeadPhone('');
    setNewLeadFollowUp('');
    setNewLeadStatus('New');

    setLeadSubmitSuccess(true);
    setTimeout(() => {
      setLeadSubmitSuccess(false);
      setShowAddLead(false);
    }, 1500);
  };

  const handleDeleteLead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = leads.filter(l => l.id !== id);
    saveLeadsToStorage(updated);
  };

  const handleUpdateLeadStatus = (id: string, newStatus: Lead['status'], e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l);
    saveLeadsToStorage(updated);
  };

  const handleResetSystem = () => {
    saveInstituteToStorage(null);
    // Keep courses but clear selection
    setSelectedCourse(null);
    // Empty input fields
    setObName('');
    setObAddress('');
    setObEmail('');
    setObPhone('');
    setObEstb('2020');
    setObLogoType('preset');
    setSelectedPresetId('shield');
    setObDataUrl(undefined);
  };

  // Filter courses based on search & levels
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.curriculum.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
                          lead.phone.includes(leadSearchQuery) ||
                          lead.course.toLowerCase().includes(leadSearchQuery.toLowerCase());
    const matchesStatus = leadStatusFilter === 'all' || lead.status === leadStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate high-fidelity stats for administrative overview
  const totalCourses = courses.length;
  const avgFee = totalCourses > 0 ? Math.round(courses.reduce((acc, c) => acc + c.fees, 0) / totalCourses) : 0;
  const highestFee = totalCourses > 0 ? Math.max(...courses.map(c => c.fees)) : 0;
  const levelsCount = courses.reduce((acc, c) => {
    acc[c.level] = (acc[c.level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const leadsOverview = {
    total: leads.length,
    new: leads.filter(l => l.status === 'New').length,
    contacted: leads.filter(l => l.status === 'Contacted').length,
    converted: leads.filter(l => l.status === 'Converted').length,
    lost: leads.filter(l => l.status === 'Lost').length
  };

  // Render the preset image indicator
  const renderEmblem = (presetId: string | undefined, sizeClass: string = "w-10 h-10") => {
    const match = LOGO_PRESETS.find(p => p.id === presetId) || LOGO_PRESETS[0];
    return (
      <div className={`rounded-xl p-2.5 flex items-center justify-center border ${match.color} ${match.bg}`}>
        {React.cloneElement(match.svg as React.ReactElement<{ className?: string }>, { className: sizeClass })}
      </div>
    );
  };

  if (!isClient) {
    return (
      <div id="loader-wrapper" className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium text-sm antialiased font-sans">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  // --- RENDERING ONBOARDING VIEW ---
  if (!institute) {
    return (
      <div id="onboarding-page" className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-2xl w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-200/80"
        >
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mb-4 shadow-sm">
              <Building2 className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
              Initialize Your Institute
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Complete your academy profile to generate your customized administration board.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleOnboardingSubmit}>
            {onboardingError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0" />
                <span>{onboardingError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Institute Name */}
              <div className="col-span-2">
                <label htmlFor="inst_name" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Institute Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="inst_name"
                  type="text"
                  placeholder="e.g. Oxford Science & Technology Institute"
                  value={obName}
                  onChange={(e) => setObName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition text-sm bg-slate-50 font-medium"
                  required
                />
              </div>

              {/* Administrative Email */}
              <div>
                <label htmlFor="inst_email" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Contact Email <span className="text-rose-500">*</span>
                </label>
                <input
                  id="inst_email"
                  type="email"
                  placeholder="e.g. administration@yourdomain.edu"
                  value={obEmail}
                  onChange={(e) => setObEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition text-sm bg-slate-50 font-medium"
                  required
                />
              </div>

              {/* Contact number */}
              <div>
                <label htmlFor="inst_phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Contact Number <span className="text-rose-500">*</span>
                </label>
                <input
                  id="inst_phone"
                  type="tel"
                  placeholder="e.g. +1 (555) 019-2834"
                  value={obPhone}
                  onChange={(e) => setObPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition text-sm bg-slate-50 font-medium"
                  required
                />
              </div>

              {/* Address */}
              <div className="col-span-2">
                <label htmlFor="inst_address" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Physical Address <span className="text-rose-500">*</span>
                </label>
                <input
                  id="inst_address"
                  type="text"
                  placeholder="e.g. Suite 400, 128 Research Avenue, Boston MA"
                  value={obAddress}
                  onChange={(e) => setObAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition text-sm bg-slate-50 font-medium"
                  required
                />
              </div>

              {/* Established Year */}
              <div>
                <label htmlFor="inst_estb" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Established Year <span className="text-rose-500">*</span>
                </label>
                <input
                  id="inst_estb"
                  type="number"
                  min="1900"
                  max="2026"
                  placeholder="e.g. 2012"
                  value={obEstb}
                  onChange={(e) => setObEstb(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition text-sm bg-slate-50 font-medium"
                  required
                />
              </div>

              {/* Logo Choice Type selection */}
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Institution Logo Core
                </span>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setObLogoType('preset')}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl text-center border transition ${
                      obLogoType === 'preset'
                        ? 'border-emerald-600 bg-emerald-50/50 text-emerald-700'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Select Crest Preset
                  </button>
                  <button
                    type="button"
                    onClick={() => setObLogoType('upload')}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl text-center border transition ${
                      obLogoType === 'upload'
                        ? 'border-emerald-600 bg-emerald-50/50 text-emerald-700'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Upload Custom PNG
                  </button>
                </div>
              </div>
            </div>

            {/* Logo Configuration Block */}
            <div className="mt-4 p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
              {obLogoType === 'preset' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Pick An Academic Crest Accent
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {LOGO_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setSelectedPresetId(preset.id)}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                          selectedPresetId === preset.id
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600/25 shadow-sm'
                            : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        {preset.svg}
                        <span className="text-[10px] whitespace-nowrap overflow-hidden text-ellipsis w-full text-center font-bold">
                          {preset.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    File Drop or Selection
                  </label>
                  <div 
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-5 text-center transition cursor-pointer flex flex-col items-center justify-center gap-2 ${
                      dragActive 
                        ? 'border-emerald-500 bg-emerald-50/80 text-emerald-800' 
                        : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {obDataUrl ? (
                      <div className="flex items-center gap-3">
                        <img 
                          src={obDataUrl} 
                          alt="Custom logo input" 
                          className="w-12 h-12 object-cover rounded-xl border border-slate-200 bg-slate-100" 
                        />
                        <div className="text-left">
                          <p className="text-xs font-bold text-emerald-700">Logo Processed Successfully</p>
                          <button
                            type="button"
                            onClick={() => setObDataUrl(undefined)}
                            className="text-[10px] text-rose-500 hover:underline font-bold"
                          >
                            Remove Logo File
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-slate-400" />
                        <div className="text-xs">
                          <span className="font-bold text-slate-700 hover:underline">Click to browse</span> or drag & drop image logo
                        </div>
                        <p className="text-[10px] text-slate-400">Supports PNG, JPG (Square ratio recommended)</p>
                        <input
                          id="logo_file_input"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Summary Note */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-100/50 text-slate-600 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p>
                <strong>System Ready:</strong> Clicking the initialize button establishes high-performance client state logic. You can easily reset your data configurations at any point.
              </p>
            </div>

            {/* Submit Action */}
            <button
              id="submit-onboard-button"
              type="submit"
              className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm tracking-wide shadow-sm hover:bg-slate-800 focus:outline-none transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Start Setting Up
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- RENDERING ADMINISTRATION WORKSPACE ---
  return (
    <div id="dashboard-scaffold" className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* LEFT SIDEBAR PANEL */}
      <aside 
        id="sidebar-nav" 
        className="w-full md:w-64 border-r border-slate-200/80 bg-white flex flex-col shrink-0 md:sticky md:top-0 md:h-screen"
      >
        {/* Sidebar Header Brand block */}
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          {institute.logoType === 'upload' && institute.logoDataUrl ? (
            <img 
              src={institute.logoDataUrl} 
              alt={institute.name}
              className="w-10 h-10 object-cover rounded-xl border border-slate-200" 
            />
          ) : (
            renderEmblem(institute.logoPresetId, "w-5 h-5")
          )}
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold text-slate-800 truncate leading-tight font-display">
              {institute.name}
            </h1>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider">
              ESTB. {institute.estbYear}
            </span>
          </div>
        </div>

        {/* Sidebar Navigation Options */}
        <nav className="flex-1 p-3 space-y-1">
          <button
            id="tab-btn-overview"
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span>Overview & Stats</span>
          </button>

          <button
            id="tab-btn-courses"
            onClick={() => { setActiveTab('courses'); setShowAddCourse(false); }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition ${
              activeTab === 'courses'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <div className="flex-1 flex items-center justify-between">
              <span>Courses Directory</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono leading-none ${
                activeTab === 'courses' ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {courses.length}
              </span>
            </div>
          </button>

          <button
            id="tab-btn-leads"
            onClick={() => { setActiveTab('leads'); setShowAddLead(false); }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition ${
              activeTab === 'leads'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <div className="flex-1 flex items-center justify-between">
              <span>Leads & Inquiries</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono leading-none ${
                activeTab === 'leads' ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {leads.length}
              </span>
            </div>
          </button>
        </nav>

        {/* Sidebar Footer Account Details */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-[11px] text-slate-500 space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="w-3 h-3 text-slate-400" />
            <span className="truncate">{institute.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3 text-slate-400" />
            <span>{institute.phone}</span>
          </div>
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[10px]">
            <span className="text-slate-400">Database Status:</span>
            <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full uppercase tracking-wider text-[9px]">
              Offline Sync
            </span>
          </div>
        </div>
      </aside>

      {/* RIGHT WORKSPACE FRAME */}
      <main id="main-content-panel" className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        
        {/* Workspace Top Bar */}
        <header id="top-bar" className="bg-white border-b border-slate-200/85 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm/5 block">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Institute Dashboard
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight font-display">
              {activeTab === 'overview' && 'Overview'}
              {activeTab === 'courses' && (!showAddCourse ? 'Courses' : 'Add Course')}
              {activeTab === 'leads' && (!showAddLead ? 'Leads & Inquiries' : 'New Lead Entry')}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick reset profile option */}
            <button
              id="reset-state-button"
              onClick={handleResetSystem}
              title="Reset configuration profile"
              className="flex items-center gap-1.5 py-2 px-3 text-xs bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 hover:text-rose-700 font-bold text-slate-600 rounded-xl transition cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Edit Profile</span>
            </button>

            {/* Quick time stamp to look polished */}
            <div className="hidden lg:flex flex-col items-end text-right text-[10px] font-mono text-slate-400">
              <span className="font-bold text-slate-500 uppercase">Interactive Terminal</span>
              <span>UTC Connected</span>
            </div>
          </div>
        </header>

        {/* WORKSPACE CANVAS WITH ACTIVE TAB ROUTING */}
        <div className="p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto space-y-6">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: OVERVIEW & STATS */}
            {activeTab === 'overview' && (
              <motion.div
                key="tab-overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Banner Profile Summary */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 text-slate-100 opacity-50 shrink-0 pointer-events-none">
                    <Building2 className="w-40 h-40 -mr-10 -mt-10" />
                  </div>
                  
                  <div className="flex items-start gap-4">
                    {institute.logoType === 'upload' && institute.logoDataUrl ? (
                      <img 
                        src={institute.logoDataUrl} 
                        alt={institute.name}
                        className="w-16 h-16 object-cover rounded-xl border border-slate-200 shadow-sm" 
                      />
                    ) : (
                      renderEmblem(institute.logoPresetId, "w-8 h-8")
                    )}
                    <div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                        Active Education Profile
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight font-display mt-1">
                        {institute.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                        <span>{institute.address}</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 text-xs text-slate-600 shrink-0">
                    <div>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase">Desk Desk:</span>
                      <span className="font-semibold">{institute.phone}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase">Year Founded:</span>
                      <span className="font-semibold">{institute.estbYear}</span>
                    </div>
                    <div className="col-span-2 mt-1">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase">Registrar Inboxes:</span>
                      <span className="font-semibold">{institute.email}</span>
                    </div>
                  </div>
                </div>

                {/* KPI Metrics Widgets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* KPI 1 */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-5 flex items-center justify-between shadow-sm/5">
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Total Courses
                      </span>
                      <span className="block text-2xl font-bold text-slate-800 mt-1 font-display">
                        {totalCourses}
                      </span>
                      <p className="text-[10px] text-slate-500 mt-0.5">Active registry items</p>
                    </div>
                    <div className="rounded-xl p-3 bg-slate-50 text-slate-700 border border-slate-100">
                      <BookOpen className="w-5 h-5" />
                    </div>
                  </div>

                  {/* KPI 2 */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-5 flex items-center justify-between shadow-sm/5">
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Average Tuition
                      </span>
                      <span className="block text-2xl font-bold text-slate-800 mt-1 font-display">
                        ₹{avgFee.toLocaleString()}
                      </span>
                      <p className="text-[10px] text-slate-500 mt-0.5">Per individual program</p>
                    </div>
                    <div className="rounded-xl p-3 bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <IndianRupee className="w-5 h-5" />
                    </div>
                  </div>

                  {/* KPI 3 */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-5 flex items-center justify-between shadow-sm/5">
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Premium Program
                      </span>
                      <span className="block text-2xl font-bold text-slate-800 mt-1 font-display">
                        ₹{highestFee.toLocaleString()}
                      </span>
                      <p className="text-[10px] text-slate-500 mt-0.5">Peak course tuition</p>
                    </div>
                    <div className="rounded-xl p-3 bg-indigo-50 text-indigo-600 border border-indigo-100">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                  </div>

                  {/* KPI 4 */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-5 flex items-center justify-between shadow-sm/5">
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Avg Setup
                      </span>
                      <span className="block text-2xl font-bold text-slate-800 mt-1 font-display">
                        {Math.max(1, Math.round(courses.length ? (courses.length * 3.5) : 0))} Modules
                      </span>
                      <p className="text-[10px] text-slate-500 mt-0.5">Curriculum items set</p>
                    </div>
                    <div className="rounded-xl p-3 bg-amber-50 text-amber-600 border border-amber-100">
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>

                </div>

                {/* Double Section: Levels Distribution & Operations checklist */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  
                  {/* Left Column: Skill Matrix distribution chart list */}
                  <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Course Level Allocation
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">Ratio of active course difficulties</p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-emerald-700">Beginner Level</span>
                          <span className="text-slate-500">{(levelsCount['Beginner'] || 0)} Course(s)</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                            style={{ width: `${totalCourses ? ((levelsCount['Beginner'] || 0) / totalCourses) * 100 : 0}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-indigo-700">Intermediate Level</span>
                          <span className="text-slate-500">{(levelsCount['Intermediate'] || 0)} Course(s)</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
                            style={{ width: `${totalCourses ? ((levelsCount['Intermediate'] || 0) / totalCourses) * 100 : 0}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-rose-700">Advanced Level</span>
                          <span className="text-slate-500">{(levelsCount['Advanced'] || 0)} Course(s)</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-rose-500 h-full rounded-full transition-all duration-500" 
                            style={{ width: `${totalCourses ? ((levelsCount['Advanced'] || 0) / totalCourses) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 px-3.5 py-3 rounded-lg bg-slate-50 border border-slate-150 text-[11px] text-slate-500">
                      <strong>Dynamic Ratio Recommendation:</strong> Maintaining a healthy pipeline of 2:1 beginners to advanced courses ensures highly accessible entry-funnels.
                    </div>
                  </div>

                  {/* Right Column: Administrative Workspace Action board */}
                  <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Onboarding & Course Checklist
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5">Track setup compliance states</p>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-50 border border-slate-200 py-0.5 px-2 rounded-md">
                          Auto-Evaluated
                        </span>
                      </div>

                      {/* checklist items */}
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2.5 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="text-slate-700 font-medium line-through decoration-slate-300">
                            Set Up Profile
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5 text-xs">
                          {institute.logoPresetId || institute.logoDataUrl ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0"></div>
                          )}
                          <span className={`text-slate-700 font-medium ${institute.logoPresetId || institute.logoDataUrl ? 'line-through decoration-slate-300' : ''}`}>
                            Upload custom PNG emblem or select high-contrast crest
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5 text-xs">
                          {courses.length > 0 ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0"></div>
                          )}
                          <span className={`text-slate-700 font-medium ${courses.length > 0 ? 'line-through decoration-slate-300' : ''}`}>
                            Publish first course with curriculum module ledger
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5 text-xs">
                          {courses.some(c => c.curriculum.length >= 5) ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0"></div>
                          )}
                          <span className={`text-slate-700 font-medium ${courses.some(c => c.curriculum.length >= 5) ? 'line-through decoration-slate-300' : ''}`}>
                            Add detailed curriculum chapters (minimum 5 items in a single course)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
                      <div className="text-[11px] text-slate-500">
                        {courses.length === 0 ? (
                          <span>No courses are registered.</span>
                        ) : (
                          <span>Registry contains beautiful course items.</span>
                        )}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Recent Courses strip */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Recently Catalogued Courses
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">Quick lookup of core curriculum streams</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('courses')}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-0.5"
                    >
                      Browse full directory
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {courses.length === 0 ? (
                    <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl bg-slate-50/40 text-slate-500 text-xs text-center flex flex-col items-center justify-center gap-1">
                      <BookMarked className="w-5 h-5 text-slate-400" />
                      <p className="font-bold">Registry Directory is Empty</p>
                      <p className="text-[10px] text-slate-400">Head over to &quot;Add New Course&quot; or seed sample programs.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {courses.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer flex flex-col justify-between hover:shadow-sm"
                          onClick={() => setSelectedCourse(item)}
                        >
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                item.level === 'Beginner' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                item.level === 'Intermediate' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                                'bg-rose-50 text-rose-700 border border-rose-100'
                              }`}>
                                {item.level}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-0.5">
                                <Clock className="w-3 h-3 text-slate-400" />
                                {item.duration}
                              </span>
                            </div>
                            <h5 className="font-bold text-slate-800 text-sm tracking-tight truncate">
                              {item.name}
                            </h5>
                            <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 font-medium">
                              {item.description}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-slate-100/60 mt-3 flex justify-between items-center text-xs">
                            <span className="font-bold text-emerald-600">₹{item.fees.toLocaleString()}</span>
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest flex items-center gap-0.5">
                              {item.curriculum.length} Modules
                              <ChevronRight className="w-3 h-3 text-slate-400" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </motion.div>
            )}

            {/* TAB 2: COURSES DIRECTORY */}
            {activeTab === 'courses' && (
              <AnimatePresence mode="wait">
                {!showAddCourse ? (
                  <motion.div
                    key="tab-courses"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                {/* Search & Filtering Panel */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex flex-col md:flex-row gap-3 items-center justify-between">
                  
                  {/* Search query field */}
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search courses, description or curriculum..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 font-medium"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Level filtering buttons & Add button */}
                  <div className="flex items-center justify-between w-full md:w-auto gap-4">
                    <div className="flex items-center gap-1.5 overflow-x-auto">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 hidden sm:block mr-1" />
                    <button
                      onClick={() => setLevelFilter('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                        levelFilter === 'all'
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      All Levels
                    </button>
                    <button
                      onClick={() => setLevelFilter('Beginner')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                        levelFilter === 'Beginner'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Beginner
                    </button>
                    <button
                      onClick={() => setLevelFilter('Intermediate')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                        levelFilter === 'Intermediate'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Intermediate
                    </button>
                    <button
                      onClick={() => setLevelFilter('Advanced')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                        levelFilter === 'Advanced'
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Advanced
                    </button>
                  </div>
                  
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="flex border border-slate-200/80 rounded-lg overflow-hidden bg-white p-0.5 mt-2 sm:mt-0">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded-md transition ${viewMode === 'grid' ? 'bg-slate-100 text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                        title="Grid View"
                      >
                        <LayoutGrid className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded-md transition ${viewMode === 'list' ? 'bg-slate-100 text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                        title="List View"
                      >
                        <ListIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowAddCourse(true)}
                    className="py-1.5 px-3 bg-emerald-600/10 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg text-xs font-bold transition flex items-center gap-1 whitespace-nowrap"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Course</span>
                  </button>
                </div>
              </div>

                {/* Courses Output Grid */}
                {filteredCourses.length === 0 ? (
                  <div className="text-center bg-white border border-slate-200/80 rounded-2xl p-12 flex flex-col items-center justify-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-200 shadow-sm">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-800">No Program Matches Key Filters</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        We couldn&apos;t locate courses matching your prompt or keyword. Try another filter or map your first course.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => { setSearchQuery(''); setLevelFilter('all'); }}
                        className="px-3.5 py-2 text-xs bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 text-slate-600 font-bold transition"
                      >
                        Clear Filters
                      </button>
                      <button
                        onClick={() => setShowAddCourse(true)}
                        className="px-3.5 py-2 text-xs bg-slate-900 rounded-lg text-white font-bold hover:bg-slate-800 transition"
                      >
                        Publish Course
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4 flex flex-col"}>
                    {filteredCourses.map((course) => (
                      <motion.div
                        key={course.id}
                        layout
                        whileHover={{ y: -3 }}
                        onClick={() => setSelectedCourse(course)}
                        className={`bg-white rounded-2xl border border-slate-200/80 p-5 ${viewMode === 'list' ? 'flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between' : 'flex flex-col justify-between'} hover:shadow-md cursor-pointer transition relative group`}
                      >
                        <div className={viewMode === 'list' ? 'flex-1 w-full sm:w-auto relative' : ''}>
                          {/* Card Header tag metadata */}
                          <div className={`flex justify-between items-center gap-2 mb-3 ${viewMode === 'list' ? 'sm:absolute sm:right-0 sm:top-0' : ''}`}>
                            {viewMode === 'grid' && (
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                course.level === 'Beginner' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                course.level === 'Intermediate' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                                'bg-rose-50 text-rose-700 border border-rose-100'
                              }`}>
                                {course.level}
                              </span>
                            )}

                            <div className="flex items-center gap-2">
                              {viewMode === 'list' && (
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                  course.level === 'Beginner' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                  course.level === 'Intermediate' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                                  'bg-rose-50 text-rose-700 border border-rose-100'
                                }`}>
                                  {course.level}
                                </span>
                              )}
                              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-0.5">
                                <Clock className="w-3 h-3 text-slate-300" />
                                {course.duration}
                              </span>
                            </div>
                          </div>

                          {/* Body Content */}
                          <h4 className={`font-bold text-slate-800 tracking-tight leading-tight group-hover:text-emerald-700 transition ${viewMode === 'list' ? 'text-lg sm:pr-40' : 'text-base'}`}>
                            {course.name}
                          </h4>
                          <p className={`text-xs text-slate-500 mt-2 leading-relaxed font-medium ${viewMode === 'list' ? 'max-w-3xl line-clamp-2' : 'line-clamp-3'}`}>
                            {course.description}
                          </p>

                          {/* Previewing first 3 curriculum topics tag items */}
                          <div className={`mt-4 pt-4 border-t border-slate-100 ${viewMode === 'list' ? 'sm:flex sm:gap-3 sm:flex-wrap items-center' : 'space-y-1.5'}`}>
                            <span className={`text-[10px] text-slate-400 font-bold uppercase tracking-wider block ${viewMode === 'list' ? 'mr-1 mb-1 sm:mb-0' : ''}`}>
                              SAMPLE LESSON MODULES
                            </span>
                            <div className={viewMode === 'grid' ? 'space-y-1' : 'flex flex-wrap items-center gap-2'}>
                              {course.curriculum.slice(0, 3).map((item, id) => (
                                <div key={id} className={`flex items-start gap-1.5 text-[10px] text-slate-600 ${viewMode === 'list' ? 'bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-md' : ''}`}>
                                  {viewMode === 'grid' && <span className="text-emerald-600 shrink-0 select-none mt-0.5">▪</span>}
                                  <span className="truncate max-w-[200px]">{item}</span>
                                </div>
                              ))}
                              {course.curriculum.length > 3 && (
                                <div className="text-[9px] text-slate-400 italic">
                                  + {course.curriculum.length - 3} more
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Card bottom details */}
                        <div className={`border-t border-slate-100 flex justify-between items-center text-xs ${viewMode === 'list' ? 'pt-0 border-t-0 mt-0 sm:flex-col sm:items-end sm:gap-2 sm:min-w-[120px]' : 'pt-4 mt-5'}`}>
                          <div className={viewMode === 'list' ? 'text-left sm:text-right w-full sm:w-auto' : ''}>
                            <span className={`block text-[8px] text-slate-400 font-bold uppercase ${viewMode === 'list' ? 'hidden sm:block' : ''}`}>TUITION FEE</span>
                            <span className={`font-bold text-slate-800 text-sm ${viewMode === 'list' ? 'text-lg sm:text-base text-emerald-600 sm:text-slate-800' : ''}`}>
                              ₹{course.fees.toLocaleString()}
                            </span>
                          </div>

                          {/* Hover display actions */}
                          <button
                            type="button"
                            onClick={(e) => handleDeleteCourse(course.id, e)}
                            title="Drop course catalog item"
                            className={`p-1 px-2.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition duration-150 flex items-center gap-1 text-[10px] font-bold ${viewMode === 'list' ? 'sm:self-end' : ''}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="tab-add"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-3xl mx-auto w-full"
              >
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
                  
                  {/* Explainer intro block */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-50/75 border border-orange-100/50 text-slate-700 text-xs mb-6">
                    <Sparkles className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-orange-950">Add a New Course</p>
                      <p className="mt-0.5 text-slate-600 italic">
                        Author comprehensive programs mapping specific student goals. Each catalogued ledger will compute across dashboard counters instantaneously.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleCreateCourse} className="space-y-6">
                    {courseSubmitError && (
                      <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                        <Info className="w-4 h-4 shrink-0" />
                        <span>{courseSubmitError}</span>
                      </div>
                    )}

                    {courseSubmitSuccess && (
                      <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                        <span>Success! Course saved. Moving to directory grid.</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
                      {/* Name */}
                      <div className="col-span-2">
                        <label htmlFor="course_name" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                          Course Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="course_name"
                          type="text"
                          placeholder="e.g. Masterclass in Quantitative Algorithmic Trading"
                          value={newCourseName}
                          onChange={(e) => setNewCourseName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition text-sm bg-slate-50 font-medium"
                          required
                        />
                      </div>

                      {/* Level */}
                      <div>
                        <label htmlFor="course_level" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                          Target Curriculum Level <span className="text-rose-500">*</span>
                        </label>
                        <select
                          id="course_level"
                          value={newCourseLevel}
                          onChange={(e) => setNewCourseLevel(e.target.value as any)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition text-sm bg-slate-50 font-bold text-slate-700 cursor-pointer"
                        >
                          <option value="Beginner">Beginner - Fundamental Guidance</option>
                          <option value="Intermediate">Intermediate - Specialized Focus</option>
                          <option value="Advanced">Advanced - Executive Masterclass</option>
                        </select>
                      </div>

                      {/* Duration */}
                      <div>
                        <label htmlFor="course_duration" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                          Program Duration <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="course_duration"
                          type="text"
                          placeholder="e.g. 12 Weeks, 6 Months, 4 semesters"
                          value={newCourseDuration}
                          onChange={(e) => setNewCourseDuration(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition text-sm bg-slate-50 font-medium"
                          required
                        />
                      </div>

                      {/* Tuition Fees */}
                      <div>
                        <label htmlFor="course_fees" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                          Tuition Fee (₹ INR) <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450" />
                          <input
                            id="course_fees"
                            type="number"
                            placeholder="e.g. 2500"
                            value={newCourseFees}
                            onChange={(e) => setNewCourseFees(e.target.value)}
                            className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition text-sm bg-slate-50 font-medium"
                            required
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="col-span-2">
                        <label htmlFor="course_desc" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                          Brief Outline Details <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                          id="course_desc"
                          rows={3}
                          placeholder="State the core objective, terminal targets, and industry relevance..."
                          value={newCourseDesc}
                          onChange={(e) => setNewCourseDesc(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition text-sm bg-slate-50 font-medium resize-none"
                          required
                        />
                      </div>
                    </div>

                    {/* DYNAMIC CURRICULUM BUILDER */}
                    <div className="border border-slate-150 rounded-xl p-4 sm:p-5 bg-slate-50/55 space-y-4">
                      <div>
                        <span className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Structured Module / Lessons Index
                        </span>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Incorporate exact learning landmarks step-by-step. At least 1 item is required for enrollment.
                        </p>
                      </div>

                      {/* Modules dynamic input queue */}
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Add topic (e.g. Weeks 1-2: Core Linear Regression Mathematics)"
                          value={curriculumInput}
                          onChange={(e) => setCurriculumInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddCurriculumItem();
                            }
                          }}
                          className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 font-medium"
                        />
                        <button
                          type="button"
                          onClick={handleAddCurriculumItem}
                          className="py-2 px-3 bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold rounded-lg transition shrink-0 flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Module</span>
                        </button>
                      </div>

                      {/* Display appended modules */}
                      {curriculumList.length === 0 ? (
                        <p className="text-[11px] text-slate-400 italic text-center py-4 bg-white rounded-lg border border-slate-100">
                          No curriculum topics appended to index ledger yet. Type above and click &quot;Add Module&quot;.
                        </p>
                      ) : (
                        <div className="space-y-1.5 max-h-56 overflow-y-auto">
                          {curriculumList.map((item, index) => (
                            <div 
                              key={index} 
                              className="flex items-center justify-between text-xs py-2 px-3 bg-white hover:bg-slate-100/50 rounded-lg border border-slate-150 transition group"
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] text-slate-400 bg-slate-100 border border-slate-200 py-0.5 px-2 rounded">
                                  #{index + 1}
                                </span>
                                <span className="font-medium text-slate-700">{item}</span>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleRemoveCurriculumItem(index)}
                                className="text-slate-400 hover:text-rose-600 p-0.5"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddCourse(false);
                          setNewCourseName('');
                          setNewCourseLevel('Beginner');
                          setNewCourseDuration('');
                          setNewCourseFees('');
                          setNewCourseDesc('');
                          setCurriculumList([]);
                        }}
                        className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700"
                      >
                        Cancel
                      </button>
                      
                      <button
                        type="submit"
                        className="py-2.5 px-5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer"
                      >
                        Publish Course Ledger
                      </button>
                    </div>
                  </form>

                </div>
              </motion.div>
            )}
           </AnimatePresence>
            )}

            {/* TAB 3: LEADS & INQUIRIES */}
            {activeTab === 'leads' && (
              <AnimatePresence mode="wait">
                {!showAddLead ? (
                  <motion.div
                    key="tab-leads"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Leads Stats Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm text-center">
                        <span className="block text-xs uppercase tracking-wider text-slate-400 font-bold">Total Inquiries</span>
                        <span className="block text-3xl font-display font-bold text-slate-800 mt-2">{leadsOverview.total}</span>
                      </div>
                      <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 shadow-sm text-center">
                        <span className="block text-xs uppercase tracking-wider text-emerald-600 font-bold">New Leads</span>
                        <span className="block text-3xl font-display font-bold text-emerald-700 mt-2">{leadsOverview.new}</span>
                      </div>
                      <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 shadow-sm text-center">
                        <span className="block text-xs uppercase tracking-wider text-indigo-600 font-bold">In Discussion</span>
                        <span className="block text-3xl font-display font-bold text-indigo-700 mt-2">{leadsOverview.contacted}</span>
                      </div>
                      <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 shadow-sm text-center">
                        <span className="block text-xs uppercase tracking-wider text-orange-600 font-bold">Converted</span>
                        <span className="block text-3xl font-display font-bold text-orange-700 mt-2">{leadsOverview.converted}</span>
                      </div>
                    </div>

                    {/* Leads Table Options */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex flex-col md:flex-row gap-3 items-center justify-between">
                      <div className="relative w-full md:max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search candidates, phone, or course..."
                          value={leadSearchQuery}
                          onChange={(e) => setLeadSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition"
                        />
                      </div>

                      <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto justify-between">
                        <div className="flex items-center gap-1.5 min-w-max">
                          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 hidden sm:block mr-1" />
                          {['all', 'New', 'Contacted', 'Converted', 'Lost'].map(status => (
                            <button
                              key={status}
                              onClick={() => setLeadStatusFilter(status)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                                leadStatusFilter === status ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                              }`}
                            >
                              {status === 'all' ? 'All Leads' : status}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => setShowAddLead(true)}
                          className="py-1.5 px-3 bg-emerald-600/10 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg text-xs font-bold transition flex items-center gap-1 whitespace-nowrap shrink-0"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Lead</span>
                        </button>
                      </div>
                    </div>

                    {/* Leads Grid/List */}
                    {filteredLeads.length === 0 ? (
                      <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80 border-dashed">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                          <Users className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight mb-2">No leads found</h3>
                        <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                          {leads.length === 0 
                            ? "Start logging prospective students." 
                            : "No prospects match your current search filters."}
                        </p>
                        {leads.length > 0 && (
                          <button
                            onClick={() => { setLeadSearchQuery(''); setLeadStatusFilter('all'); }}
                            className="text-xs font-bold text-slate-500 hover:text-emerald-600 transition"
                          >
                            Clear Filters
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold tracking-wider text-slate-500 uppercase">
                                <th className="p-4 pl-6">Candidate</th>
                                <th className="p-4">Date Added</th>
                                <th className="p-4">Contact</th>
                                <th className="p-4">Course Interest</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Follow Up</th>
                                <th className="p-4 pr-6 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredLeads.map((lead) => (
                                <tr key={lead.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition relative group">
                                  <td className="p-4 pl-6">
                                    <div className="font-bold text-slate-800">{lead.name}</div>
                                    <div className="text-[10px] text-slate-400 font-medium">From: {lead.source}</div>
                                  </td>
                                  <td className="p-4">
                                    <div className="text-slate-700 font-medium">{new Date(lead.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                  </td>
                                  <td className="p-4">
                                    <div className="text-slate-700">{lead.phone}</div>
                                    {lead.address && <div className="text-[10px] text-slate-400 font-medium truncate max-w-[150px]">{lead.address}</div>}
                                  </td>
                                  <td className="p-4">
                                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[11px] font-bold">
                                      {lead.course || 'Undecided'}
                                    </span>
                                  </td>
                                  <td className="p-4">
                                    <select
                                      value={lead.status}
                                      onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as Lead['status'], e as any)}
                                      className={`text-xs font-bold py-1 px-2 rounded border appearance-none outline-none cursor-pointer pr-6 ${
                                        lead.status === 'New' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                        lead.status === 'Contacted' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                                        lead.status === 'Converted' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                        'bg-rose-50 text-rose-700 border-rose-200'
                                      }`}
                                    >
                                      <option value="New">New</option>
                                      <option value="Contacted">Contacted</option>
                                      <option value="Converted">Converted</option>
                                      <option value="Lost">Lost</option>
                                    </select>
                                  </td>
                                  <td className="p-4">
                                    <div className="flex items-center gap-1.5 text-slate-500 font-medium text-[11px]">
                                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                      {new Date(lead.followUp).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})}
                                    </div>
                                  </td>
                                  <td className="p-4 pr-6 text-right">
                                    <button
                                      onClick={(e) => handleDeleteLead(lead.id, e)}
                                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition opacity-0 group-hover:opacity-100"
                                      title="Delete Lead"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="tab-add-lead"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="max-w-3xl mx-auto w-full"
                  >
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
                      <div className="mb-6 pb-6 border-b border-slate-100 flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold font-display text-slate-900 tracking-tight">Log New Inquiry</h3>
                          <p className="text-sm text-slate-500 mt-1">Capture candidate interest safely in the ledger.</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <Users className="w-5 h-5" />
                        </div>
                      </div>

                      {leadSubmitError && (
                        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-sm font-medium flex items-center gap-2">
                          <X className="w-4 h-4" />
                          <span>{leadSubmitError}</span>
                        </div>
                      )}

                      {leadSubmitSuccess && (
                        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Lead successfully registered! Redirecting to queue...</span>
                        </div>
                      )}

                      <form onSubmit={handleAddLeadSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* Name Input */}
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                              Candidate Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={newLeadName}
                              onChange={(e) => setNewLeadName(e.target.value)}
                              placeholder="Full Name"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition text-sm bg-slate-50"
                              required
                            />
                          </div>

                          {/* Phone Input */}
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                              Phone Number <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="tel"
                              value={newLeadPhone}
                              onChange={(e) => setNewLeadPhone(e.target.value)}
                              placeholder="Contact number"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition text-sm bg-slate-50"
                              required
                            />
                          </div>

                          {/* Course Select */}
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                              Course of Interest
                            </label>
                            <select
                              value={newLeadCourse}
                              onChange={(e) => setNewLeadCourse(e.target.value)}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition text-sm bg-slate-50 font-medium"
                            >
                              <option value="">Undecided / Open</option>
                              {courses.map(c => (
                                <option key={c.id} value={c.name}>{c.name}</option>
                              ))}
                            </select>
                          </div>

                          {/* Source Select */}
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                              Source / Origin
                            </label>
                            <select
                              value={newLeadSource}
                              onChange={(e) => setNewLeadSource(e.target.value)}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition text-sm bg-slate-50 font-medium"
                            >
                              <option value="Website">Website</option>
                              <option value="Phone">Phone Inquiry</option>
                              <option value="Walk-in">Walk-in</option>
                              <option value="Referral">Referral</option>
                              <option value="Social Media">Social Media</option>
                            </select>
                          </div>

                          {/* Follow Up Date */}
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                              Next Follow Up
                            </label>
                            <input
                              type="date"
                              value={newLeadFollowUp}
                              onChange={(e) => setNewLeadFollowUp(e.target.value)}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition text-sm bg-slate-50"
                            />
                          </div>
                          
                          {/* Status */}
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                              Current Status
                            </label>
                            <select
                              value={newLeadStatus}
                              onChange={(e) => setNewLeadStatus(e.target.value as any)}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition text-sm bg-slate-50 font-medium"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Converted">Converted</option>
                              <option value="Lost">Lost</option>
                            </select>
                          </div>

                          {/* Address Input */}
                          <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                              Address Details
                            </label>
                            <textarea
                              value={newLeadAddress}
                              onChange={(e) => setNewLeadAddress(e.target.value)}
                              placeholder="Optional resident address..."
                              rows={2}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition text-sm bg-slate-50 resize-none"
                            />
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setShowAddLead(false);
                            }}
                            className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700"
                          >
                            Cancel
                          </button>
                          
                          <button
                            type="submit"
                            className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer"
                          >
                            Save Inquiry
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* INDIVIDUAL COURSE CURRICULUM PREVIEW MODAL */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-2xl w-full rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-start">
                <div className="space-y-1.5 flex-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      selectedCourse.level === 'Beginner' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                      selectedCourse.level === 'Intermediate' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                      'bg-rose-50 text-rose-700 border border-rose-100'
                    }`}>
                      {selectedCourse.level} Program
                    </span>

                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-350" />
                      {selectedCourse.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-display tracking-tight">
                    {selectedCourse.name}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-1 rounded-lg border border-slate-150 text-slate-400 hover:text-slate-600 hover:bg-slate-100/50 transition shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                
                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                    PROGRAM DESCRIPTION & GOALS
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {selectedCourse.description}
                  </p>
                </div>

                {/* Fees and stats row */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <span className="block text-[9px] text-slate-400 font-bold uppercase">Tuition Fee</span>
                    <span className="text-base font-bold text-slate-900">
                      ₹{selectedCourse.fees.toLocaleString()} INR
                    </span>
                  </div>

                  <div>
                    <span className="block text-[9px] text-slate-400 font-bold uppercase">Duration</span>
                    <span className="text-base font-bold text-slate-900">
                      {selectedCourse.duration}
                    </span>
                  </div>
                </div>

                {/* Curriculum sequence map */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                    CURRICULUM TIMELINE
                  </h4>

                  <div className="space-y-2">
                    {selectedCourse.curriculum.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-lg hover:border-slate-200 transition"
                      >
                        <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 py-0.5 px-1.5 rounded shrink-0">
                          M-{idx + 1}
                        </span>
                        <div className="text-xs text-slate-700 font-medium pt-0.5">
                          {item}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer actions */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs">
                <span className="text-[10px] text-slate-450 italic">
                  Course Output
                </span>

                <button
                  onClick={() => setSelectedCourse(null)}
                  className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold rounded-lg transition"
                >
                  Close Registry View
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
