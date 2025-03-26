
import { useState, useEffect } from 'react';

interface Team {
  id: number;
  name: string;
  shortName: string;
  logo: string;
}

interface Match {
  id: number;
  team1: Team;
  team2: Team;
  date: string;
  time: string;
  venue: string;
  matchType: string;
}

const MatchSchedule = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating API fetch with mock data
    setTimeout(() => {
      const mockTeams: Team[] = [
        { id: 1, name: 'Mumbai Indians', shortName: 'MI', logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/MI/Logos/Medium/MI.png' },
        { id: 2, name: 'Chennai Super Kings', shortName: 'CSK', logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/CSK/logos/Medium/CSK.png' },
        { id: 3, name: 'Royal Challengers Bangalore', shortName: 'RCB', logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RCB/Logos/Medium/RCB.png' },
        { id: 4, name: 'Kolkata Knight Riders', shortName: 'KKR', logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/KKR/Logos/Medium/KKR.png' },
        { id: 5, name: 'Delhi Capitals', shortName: 'DC', logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/DC/Logos/Medium/DC.png' },
        { id: 6, name: 'Punjab Kings', shortName: 'PBKS', logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/PBKS/Logos/Medium/PBKS.png' },
      ];

      const mockMatches: Match[] = [
        {
          id: 1,
          team1: mockTeams[0],
          team2: mockTeams[1],
          date: '2025-03-20',
          time: '19:30',
          venue: 'Wankhede Stadium, Mumbai',
          matchType: 'IPL'
        },
        {
          id: 2,
          team1: mockTeams[2],
          team2: mockTeams[3],
          date: '2025-03-21',
          time: '15:30',
          venue: 'M. Chinnaswamy Stadium, Bangalore',
          matchType: 'IPL'
        },
        {
          id: 3,
          team1: mockTeams[4],
          team2: mockTeams[5],
          date: '2025-03-22',
          time: '19:30',
          venue: 'Arun Jaitley Stadium, Delhi',
          matchType: 'IPL'
        },
      ];
      
      setMatches(mockMatches);
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-ipl-blue mb-4">Upcoming Matches</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest match schedule and make your predictions ahead of time
          </p>
        </div>

        {isLoading ? (
          // Skeleton loader
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                <div className="h-12 bg-gray-200 rounded-md mb-4"></div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
                  </div>
                </div>
                <div className="h-6 bg-gray-200 rounded-md mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {matches.map((match) => (
              <div 
                key={match.id} 
                className="match-card bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-ipl-orange">{formatDate(match.date)}</span>
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{match.matchType}</span>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-col items-center">
                    <img 
                      src={match.team1.logo}
                      alt={match.team1.name}
                      className="team-logo w-16 h-16 object-contain mb-2"
                    />
                    <span className="font-bold text-ipl-blue">{match.team1.shortName}</span>
                  </div>
                  
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-ipl-blue">
                    VS
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <img 
                      src={match.team2.logo}
                      alt={match.team2.name}
                      className="team-logo w-16 h-16 object-contain mb-2"
                    />
                    <span className="font-bold text-ipl-blue">{match.team2.shortName}</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="font-semibold text-gray-800 mb-1">{match.time} IST</p>
                  <p className="text-sm text-gray-600">{match.venue}</p>
                </div>
                
                <button className="w-full mt-6 py-2 bg-ipl-blue text-white rounded-lg hover:bg-ipl-blue/90 transition-colors font-medium text-sm">
                  Predict Now
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <button className="group inline-flex items-center text-ipl-blue font-medium">
            View All Matches
            <svg 
              className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MatchSchedule;
