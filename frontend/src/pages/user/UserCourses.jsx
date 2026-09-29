import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import CourseCard from '../../components/Cards/CourseCard';
import EmptyState from '../../components/Common/EmptyState';
import LoadingState from '../../components/Common/LoadingState';
import LowBandwidthToggle from '../../components/Common/LowBandwidthToggle';
import { useBandwidth } from '../../context/BandwidthContext';
import { Search, WifiOff, HardDriveDownload, BookOpen } from 'lucide-react';
import api from '../../api';

export const UserCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { bandwidthMode, isOfflineAvailable, isDataSaver } = useBandwidth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await api.getCourses();
        if (res && res.data) {
          setCourses(res.data);
        }
      } catch (err) {
        console.warn('Courses fallback');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const enrolledProgressMap = {
    c1: { progress: 72, completedLessons: 8, totalLessons: 12 },
    c2: { progress: 45, completedLessons: 4, totalLessons: 10 },
    c3: { progress: 100, completedLessons: 12, totalLessons: 12 },
    c4: { progress: 100, completedLessons: 10, totalLessons: 10 }
  };

  const categories = [
    'All',
    'Agriculture',
    'Dairy',
    'Digital Literacy',
    'Cooperative Management',
    'Finance',
    'Governance'
  ];

  const filteredCourses = courses.filter((c) => {
    let match = true;
    if (selectedCategory !== 'All' && c.category !== selectedCategory) match = false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      match = match && (
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.trainer.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }
    return match;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="LMS Cooperative Course Catalog"
        subtitle="Comprehensive curricula recognized by the Ministry of Cooperation across VAMNICOM, RICMs, and ICMs."
        breadcrumbs={[{ label: 'Trainee', link: '/user/dashboard' }, { label: 'Courses' }]}
        actions={<LowBandwidthToggle />}
      />

      {/* Low-Bandwidth Mode Notification Banner */}
      {isDataSaver && (
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span><strong>Data Saver Active:</strong> Audio-first lectures with compressed diagrams are enabled for low-connectivity rural networks.</span>
          </div>
          <span className="font-bold text-amber-700">Saving ~65% Bandwidth</span>
        </div>
      )}

      {isOfflineAvailable && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDriveDownload className="w-4 h-4 text-emerald-600" />
            <span><strong>Offline Cache Mode:</strong> Showing course modules cached to your local device memory for field study without active internet.</span>
          </div>
          <span className="font-bold text-emerald-700">6 Modules Cached</span>
        </div>
      )}

      {/* Category Tabs & Search Bar */}
      <div className="card-institutional p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#0B2A4A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses or trainers..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
          />
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <LoadingState count={6} />
      ) : filteredCourses.length === 0 ? (
        <EmptyState
          title="No courses found"
          description="Try selecting another category or clear your search query."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.courseId}
              course={course}
              userProgress={enrolledProgressMap[course.courseId]}
              isAdmin={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCourses;
