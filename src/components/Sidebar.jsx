import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-50 p-4 border-l border-gray-200 text-gray-900 hidden lg:block">
      {/* The Overflow Blog */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">The Overflow Blog</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Observability is key to the future of software (and your DevOps career)
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Podcast 374: How valuable is your screen name?
            </a>
          </li>
        </ul>
      </div>

      {/* Featured on Meta */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Featured on Meta</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Review queue workflows - Final release...
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Please welcome Valued Associates: #958 - V2Blast #959 - SpencerG
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Outdated Answers: accepted answer is now unpinned on Stack Overflow
            </a>
          </li>
        </ul>
      </div>

      {/* Hot Meta Posts */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Hot Meta Posts</h2>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <a href="#" className="text-blue-600 hover:underline">
              Why was this spam flag declined, yet the question marked as spam?
            </a>
            <span className="text-gray-600">38</span>
          </li>
          <li className="flex justify-between">
            <a href="#" className="text-blue-600 hover:underline">
              What is the best course of action when a user has high enough rep to...
            </a>
            <span className="text-gray-600">20</span>
          </li>
          <li className="flex justify-between">
            <a href="#" className="text-blue-600 hover:underline">
              Is a link to the "How to ask" help page a useful comment?
            </a>
            <span className="text-gray-600">14</span>
          </li>
        </ul>
      </div>

      {/* Watched Tags */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Watched tags</h2>
        <div className="flex flex-wrap gap-2">
          {['c', 'css', 'express', 'firebase', 'html', 'java', 'javascript', 'mern', 'mongodb', 'mysql', 'next.js', 'node.js', 'php', 'python', 'reactjs'].map(tag => (
            <span key={tag} className="bg-gray-200 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
