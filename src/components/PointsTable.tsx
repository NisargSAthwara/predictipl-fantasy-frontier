
import { useState, useEffect } from 'react';

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
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating API fetch with mock data
    setTimeout(() => {
      const mockTeams: Team[] = [
        { 
          id: 1, 
          name: 'Mumbai Indians', 
          shortName: 'MI', 
          logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/MI/Logos/Medium/MI.png',
          matches: 8,
          won: 6,
          lost: 2,
          tied: 0,
          nrr: 0.825,
          points: 12
        },
        { 
          id: 2, 
          name: 'Chennai Super Kings', 
          shortName: 'CSK', 
          logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/CSK/logos/Medium/CSK.png',
          matches: 8,
          won: 5,
          lost: 3,
          tied: 0,
          nrr: 0.714,
          points: 10
        },
        { 
          id: 3, 
          name: 'Royal Challengers Bangalore', 
          shortName: 'RCB', 
          logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RCB/Logos/Medium/RCB.png',
          matches: 8,
          won: 5,
          lost: 3,
          tied: 0,
          nrr: 0.702,
          points: 10
        },
        { 
          id: 4, 
          name: 'Kolkata Knight Riders', 
          shortName: 'KKR', 
          logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/KKR/Logos/Medium/KKR.png',
          matches: 8,
          won: 4,
          lost: 4,
          tied: 0,
          nrr: 0.425,
          points: 8
        },
        { 
          id: 5, 
          name: 'Delhi Capitals', 
          shortName: 'DC', 
          logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/DC/Logos/Medium/DC.png',
          matches: 8,
          won: 4,
          lost: 4,
          tied: 0,
          nrr: 0.109,
          points: 8
        },
        { 
          id: 6, 
          name: 'Punjab Kings', 
          shortName: 'PBKS', 
          logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/PBKS/Logos/Medium/PBKS.png',
          matches: 8,
          won: 4,
          lost: 4,
          tied: 0,
          nrr: -0.218,
          points: 8
        },
        { 
          id: 7, 
          name: 'Rajasthan Royals', 
          shortName: 'RR', 
          logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RR/Logos/Medium/RR.png',
          matches: 8,
          won: 3,
          lost: 5,
          tied: 0,
          nrr: -0.319,
          points: 6
        },
        { 
          id: 8, 
          name: 'Sunrisers Hyderabad', 
          shortName: 'SRH', 
          logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/SRH/Logos/Medium/SRH.png',
          matches: 8,
          won: 2,
          lost: 6,
          tied: 0,
          nrr: -0.514,
          points: 4
        },
        { 
          id: 9, 
          name: 'Gujarat Titans', 
          shortName: 'GT', 
          logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/Logos/Medium/GT.png',
          matches: 8,
          won: 2,
          lost: 6,
          tied: 0,
          nrr: -0.627,
          points: 4
        },
        { 
          id: 10, 
          name: 'Lucknow Super Giants', 
          shortName: 'LSG', 
          logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/LSG/Logos/Medium/LSG.png',
          matches: 8,
          won: 1,
          lost: 7,
          tied: 0,
          nrr: -0.925,
          points: 2
        }
      ];
      
      setTeams(mockTeams);
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-ipl-blue mb-4">IPL 2025 Points Table</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track your favorite team's performance and standings throughout the season
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-100">
          <table className="w-full points-table">
            <thead>
              <tr className="text-left">
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
                // Skeleton loader for table
                Array.from({ length: 10 }).map((_, index) => (
                  <tr key={index} className="animate-pulse border-b border-gray-100">
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
              ) : (
                teams.map((team, index) => (
                  <tr 
                    key={team.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      index < 4 ? 'bg-blue-50/40' : ''
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{index + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={team.logo} 
                          alt={team.name}
                          className="w-8 h-8 object-contain"
                        />
                        <span className="font-medium">{team.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">{team.matches}</td>
                    <td className="px-4 py-3 text-center">{team.won}</td>
                    <td className="px-4 py-3 text-center">{team.lost}</td>
                    <td className="px-4 py-3 text-center">{team.tied}</td>
                    <td className="px-4 py-3 text-center">{team.nrr.toFixed(3)}</td>
                    <td className="px-4 py-3 text-center font-bold">{team.points}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-sm text-gray-500 flex items-center justify-end">
          <div className="w-3 h-3 bg-blue-50 mr-2 border border-gray-200 rounded-sm"></div>
          <span>Playoff qualification zone</span>
        </div>
      </div>
    </section>
  );
};

export default PointsTable;
