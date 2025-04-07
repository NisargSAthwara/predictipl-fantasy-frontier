// Change this line from:
// import { useState, useEffect } from 'react';
// to:
import { useEffect } from 'react';
import { usePointsTable } from '@/hooks/useMatchData';

interface Team {
  id: number;
  name: string;
  shortName: string;
  logo: string;
  matches: number;
  won: number;
  lost: number;
  tied: number;
  nrr: number;
  points: number;
}

const PointsTable = () => {
  const { data: pointsTable, isLoading, error } = usePointsTable();
  console.log('Points Table data:', pointsTable);

  const teamMapping = {
    'Mumbai Indians': { 
      shortName: 'MI', 
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/MI/Logos/Medium/MI.png' 
    },
    'Chennai Super Kings': { 
      shortName: 'CSK', 
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/CSK/logos/Medium/CSK.png' 
    },
    'Royal Challengers Bangalore': {
      shortName: 'RCB',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RCB/Logos/Medium/RCB.png'
    },
    'Kolkata Knight Riders': {
      shortName: 'KKR',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/KKR/Logos/Medium/KKR.png'
    },
    'Delhi Capitals': {
      shortName: 'DC',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/DC/Logos/Medium/DC.png'
    },
    'Punjab Kings': {
      shortName: 'PBKS',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/PBKS/Logos/Medium/PBKS.png'
    },
    'Rajasthan Royals': {
      shortName: 'RR',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RR/Logos/Medium/RR.png'
    },
    'Sunrisers Hyderabad': {
      shortName: 'SRH',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/SRH/Logos/Medium/SRH.png'
    },
    'Lucknow Super Giants': {
      shortName: 'LSG',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/LSG/Logos/Medium/LSG.png'
    },
    'Gujarat Titans': {
      shortName: 'GT',
      logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/Logos/Medium/GT.png'
    }
};

  const teams = pointsTable?.map(team => ({
    id: team.teamName,
    name: team.teamName,
    shortName: teamMapping[team.teamName]?.shortName || team.teamName,
    logo: teamMapping[team.teamName]?.logo || '/default-team-logo.png',
    matches: team.matches || 0,
    won: team.won || 0,
    lost: team.lost || 0,
    tied: team.tied || 0,
    points: team.points || 0,
    nrr: typeof team.nrr === 'number' ? team.nrr : parseFloat(team.nrr || '0'),
  })).sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    return b.nrr - a.nrr;
  }) || [];

  // Remove this line as it's causing the error
  // <td className="px-4 py-3 text-center">{team.nrr.toFixed(3)}</td>

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1a365d] mb-4">IPL 2025 Points Table</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track your favorite team's performance and standings throughout the season
          </p>
        </div>
  
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
          <table className="w-full points-table">
            <thead>
              <tr className="text-left bg-[#1a365d] text-white">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Team</th>
                <th className="px-4 py-3 text-center">M</th>
                <th className="px-4 py-3 text-center">W</th>
                <th className="px-4 py-3 text-center">L</th>
                <th className="px-4 py-3 text-center">T</th>
                <th className="px-4 py-3 text-center">NRR</th>
                <th className="px-4 py-3 text-center">PTS</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 10 }).map((_, index) => (
                  <tr key={`loading-row-${index}`} className="animate-pulse border-b border-gray-200">
                    <td className="px-4 py-4"><div className="h-4 w-4 bg-gray-200 rounded-full"></div></td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center"><div className="h-4 w-4 bg-gray-200 rounded-md mx-auto"></div></td>
                    <td className="px-4 py-4 text-center"><div className="h-4 w-4 bg-gray-200 rounded-md mx-auto"></div></td>
                    <td className="px-4 py-4 text-center"><div className="h-4 w-4 bg-gray-200 rounded-md mx-auto"></div></td>
                    <td className="px-4 py-4 text-center"><div className="h-4 w-4 bg-gray-200 rounded-md mx-auto"></div></td>
                    <td className="px-4 py-4 text-center"><div className="h-4 w-12 bg-gray-200 rounded-md mx-auto"></div></td>
                    <td className="px-4 py-4 text-center"><div className="h-4 w-8 bg-gray-200 rounded-md mx-auto"></div></td>
                  </tr>
                ))
              ) : error ? (
                <tr key="error-row">
                  <td colSpan={8} className="px-4 py-6 text-center text-red-500">{error}</td>
                </tr>
              ) : (
                teams.map((team, index) => (
                  <tr 
                    key={`team-${team.id}-${index}`}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      index < 4 ? 'bg-blue-50/40' : ''
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{index + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={team.logo} 
                          alt={team.shortName}
                          className="w-8 h-8 object-contain"
                        />
                        <span className="font-medium">{team.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">{team.matches}</td>
                    <td className="px-4 py-3 text-center">{team.won}</td>
                    <td className="px-4 py-3 text-center">{team.lost || 0}</td>
                    <td className="px-4 py-3 text-center">{team.tied || 0}</td>
                    <td className="px-4 py-3 text-center">
                      {typeof team.nrr === 'number' 
                        ? team.nrr.toFixed(3) 
                        : parseFloat(team.nrr).toFixed(3)}
                    </td>
                    <td className="px-4 py-3 text-center font-bold">{team.points}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
  
        <div className="mt-4 text-sm text-gray-600 flex items-center justify-end">
          <div className="w-3 h-3 bg-blue-50 mr-2 border border-gray-200 rounded-sm"></div>
          <span>Playoff qualification zone</span>
        </div>
      </div>
    </section>
  );
};

export default PointsTable;
