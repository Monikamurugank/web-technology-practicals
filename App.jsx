import { useState } from 'react';
import Navbar from './components/Navbar';
import StatCard from './components/StatCard';
import './App.css';

const courses = [
  { id: 1, name: 'Web Technology',        code: 'CS401', credits: 4 },
  { id: 2, name: 'Database Management',   code: 'CS402', credits: 3 },
  { id: 3, name: 'Machine Learning',      code: 'CS403', credits: 4 },
  { id: 4, name: 'Computer Networks',     code: 'CS404', credits: 3 },
];

const stats = [
  { title: 'Courses',     value: '6'   },
  { title: 'Assignments', value: '12'  },
  { title: 'Attendance',  value: '92%' },
  { title: 'CGPA',        value: '8.7' },
];

function App() {
  const [darkMode, setDarkMode]   = useState(false);
  const [task, setTask]           = useState('');

  function handleAddTask() {
    if (task.trim() === '') return;
    alert(`Task added: ${task}`);
    setTask('');
  }

  return (
    <div className={darkMode ? 'app dark' : 'app'}>

      {/* Navigation Bar */}
      <Navbar />

      <main className="main-content">

        {/* Welcome Section */}
        <section id="home" className="welcome-section">
          <div className="welcome-text">
            <p className="welcome-label">STUDENT DASHBOARD</p>
            <h1>Welcome back, Monika 👋</h1>
            <p className="welcome-sub">Here is your academic overview.</p>
          </div>
          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀ Light' : '🌙 Dark'}
          </button>
        </section>

        {/* Statistics Cards */}
        <section className="stats-section">
          {stats.map((stat) => (
            <StatCard key={stat.title} title={stat.title} value={stat.value} />
          ))}
        </section>

        {/* Courses Section */}
        <section id="courses" className="courses-section">
          <h2 className="section-title">My Courses</h2>
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-code">{course.code}</div>
                <h3 className="course-name">{course.name}</h3>
                <p className="course-credits">{course.credits} Credits</p>
              </div>
            ))}
          </div>
        </section>

        {/* Add Task Section */}
        <section id="tasks" className="tasks-section">
          <h2 className="section-title">Add Task</h2>
          <div className="task-form">
            <input
              type="text"
              className="task-input"
              placeholder="Enter a new task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button className="add-task-btn" onClick={handleAddTask}>
              Add Task
            </button>
          </div>
        </section>

        {/* Profile Section */}
        <section id="profile" className="profile-section">
          <h2 className="section-title">Profile</h2>
          <div className="profile-card">
            <div className="profile-avatar">M</div>
            <div className="profile-info">
              <h3>MONIKA M</h3>
              <p>Register No: URK24CS1028</p>
              <p>Department: Computer Science &amp; Engineering</p>
              <p>Semester: 5th Semester</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 EduDashboard &nbsp;|&nbsp; MONIKA M &nbsp;|&nbsp; URK24CS1028</p>
      </footer>

    </div>
  );
}

export default App;
