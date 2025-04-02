
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useToast } from '@/components/ui/use-toast';
import { Trophy, Calendar, Clock, MapPin, Users } from 'lucide-react';

interface Match {
  id: string;
  matchDetails: string;
  teams: {
    team1: string;
    team2: string;
  };
  venue: string;
  date: string;
  time: string;
  result?: string;
  gmtTime: string;
  localTime: string;
}

const Matches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [teamFilter, setTeamFilter] = useState('');
  const [venueFilter, setVenueFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  
  const matchIds = [
    114960, 114967, 114976, 114985, 114987, 114996, 115005, 115012, 115014, 
    115021, 115030, 115032, 115039, 115048, 115050, 115059, 115068, 115075, 
    115093, 115095, 115084, 115102, 115104, 115111, 115113, 115122, 115129, 
    115138, 115140, 115149, 115156, 115165, 115167, 115174, 115176, 115183, 
    115192, 115201, 115210, 115212, 115221, 115230, 115239, 115248, 115255, 
    115257, 115266, 115275, 115282, 115291, 115300, 115302, 115309, 115318, 
    115327, 115336, 115345, 115347, 115354, 115356, 115365, 115372, 115381, 
    115390, 115392, 115401, 115410, 115417, 115426, 115435, 115437, 115444, 
    115446, 115455
  ];

  // Mock data for teams and venues for filtering
  const teams = [
    'All Teams',
    'Mumbai Indians',
    'Chennai Super Kings',
    'Royal Challengers Bangalore',
    'Kolkata Knight Riders',
    'Delhi Capitals',
    'Punjab Kings',
    'Rajasthan Royals',
    'Sunrisers Hyderabad',
    'Lucknow Super Giants',
    'Gujarat Titans'
  ];

  const venues = [
    'All Venues',
    'Mumbai',
    'Chennai',
    'Bengaluru',
    'Kolkata',
    'Delhi',
    'Ahmedabad',
    'Hyderabad',
    'Pune',
    'Lucknow',
    'Guwahati'
  ];

  // Convert the Node.js API call to a React-compatible fetch call
  const fetchMatchData = async (matchId: number) => {
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '3bd83ceaa3msh76f08ab525c228ep1636adjsne1b10cfdf8c2',
        'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(`https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/scard`, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching match data:', error);
      return null;
    }
  };

  useEffect(() => {
    const loadMatches = async () => {
      setIsLoading(true);
      
      try {
        // For demo purposes, we'll use mock data
        // In production, you would actually call the API for each match ID
        // const matchData = await Promise.all(
        //   matchIds.slice(0, 10).map(id => fetchMatchData(id))
        // );
        
        // Mock data for demonstration
        const mockMatches: Match[] = [
          {
            id: '114960',
            matchDetails: 'Kolkata Knight Riders vs Royal Challengers Bengaluru, 1st Match',
            teams: {
              team1: 'Kolkata Knight Riders',
              team2: 'Royal Challengers Bengaluru'
            },
            venue: 'Eden Gardens, Kolkata',
            date: 'Mar 22, Sat',
            time: '7:30 PM',
            result: 'Royal Challengers Bengaluru won by 7 wkts',
            gmtTime: '02:00 PM GMT',
            localTime: '07:30 PM LOCAL'
          },
          {
            id: '114967',
            matchDetails: 'Sunrisers Hyderabad vs Rajasthan Royals, 2nd Match',
            teams: {
              team1: 'Sunrisers Hyderabad',
              team2: 'Rajasthan Royals'
            },
            venue: 'Rajiv Gandhi International Stadium, Hyderabad',
            date: 'Mar 23, Sun',
            time: '3:30 PM',
            result: 'Sunrisers Hyderabad won by 44 runs',
            gmtTime: '10:00 AM GMT',
            localTime: '03:30 PM LOCAL'
          },
          {
            id: '114976',
            matchDetails: 'Mumbai Indians vs Chennai Super Kings, 3rd Match',
            teams: {
              team1: 'Mumbai Indians',
              team2: 'Chennai Super Kings'
            },
            venue: 'MA Chidambaram Stadium, Chennai',
            date: 'Mar 23, Sun',
            time: '7:30 PM',
            result: 'Chennai Super Kings won by 4 wkts',
            gmtTime: '02:00 PM GMT',
            localTime: '07:30 PM LOCAL'
          },
          {
            id: '114985',
            matchDetails: 'Lucknow Super Giants vs Delhi Capitals, 4th Match',
            teams: {
              team1: 'Lucknow Super Giants',
              team2: 'Delhi Capitals'
            },
            venue: 'Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium, Visakhapatnam',
            date: 'Mar 24, Mon',
            time: '7:30 PM',
            result: 'Delhi Capitals won by 1 wkt',
            gmtTime: '02:00 PM GMT',
            localTime: '07:30 PM LOCAL'
          },
          {
            id: '114987',
            matchDetails: 'Punjab Kings vs Gujarat Titans, 5th Match',
            teams: {
              team1: 'Punjab Kings',
              team2: 'Gujarat Titans'
            },
            venue: 'Narendra Modi Stadium, Ahmedabad',
            date: 'Mar 25, Tue',
            time: '7:30 PM',
            result: 'Punjab Kings won by 11 runs',
            gmtTime: '02:00 PM GMT',
            localTime: '07:30 PM LOCAL'
          },
          {
            id: '114996',
            matchDetails: 'Rajasthan Royals vs Kolkata Knight Riders, 6th Match',
            teams: {
              team1: 'Rajasthan Royals',
              team2: 'Kolkata Knight Riders'
            },
            venue: 'Barsapara Cricket Stadium, Guwahati',
            date: 'Mar 26, Wed',
            time: '7:30 PM',
            result: 'Kolkata Knight Riders won by 8 wkts',
            gmtTime: '02:00 PM GMT',
            localTime: '07:30 PM LOCAL'
          },
          {
            id: '115005',
            matchDetails: 'Sunrisers Hyderabad vs Lucknow Super Giants, 7th Match',
            teams: {
              team1: 'Sunrisers Hyderabad',
              team2: 'Lucknow Super Giants'
            },
            venue: 'Rajiv Gandhi International Stadium, Hyderabad',
            date: 'Mar 27, Thu',
            time: '7:30 PM',
            result: 'Lucknow Super Giants won by 5 wkts',
            gmtTime: '02:00 PM GMT',
            localTime: '07:30 PM LOCAL'
          },
          {
            id: '115012',
            matchDetails: 'Royal Challengers Bengaluru vs Chennai Super Kings, 8th Match',
            teams: {
              team1: 'Royal Challengers Bengaluru',
              team2: 'Chennai Super Kings'
            },
            venue: 'MA Chidambaram Stadium, Chennai',
            date: 'Mar 28, Fri',
            time: '7:30 PM',
            gmtTime: '02:00 PM GMT',
            localTime: '07:30 PM LOCAL'
          },
        ];

        setMatches(mockMatches);
      } catch (error) {
        console.error('Error loading matches:', error);
        toast({
          title: "Error loading matches",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadMatches();
  }, [toast]);

  const filteredMatches = matches.filter(match => {
    const teamMatches = !teamFilter || teamFilter === 'All Teams' || 
                         match.teams.team1.includes(teamFilter) || 
                         match.teams.team2.includes(teamFilter);
    
    const venueMatches = !venueFilter || venueFilter === 'All Venues' || 
                          match.venue.includes(venueFilter);
    
    return teamMatches && venueMatches;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredMatches.length / itemsPerPage);
  const paginatedMatches = filteredMatches.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setTeamFilter('');
    setVenueFilter('');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-24 md:py-28">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 text-ipl-blue">IPL 2025 Match Schedule</h1>
          <p className="text-center text-gray-600 mb-10">
            View all upcoming and completed matches in IPL 2025
          </p>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-auto">
              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map(team => (
                    <SelectItem key={team} value={team}>{team}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={venueFilter} onValueChange={setVenueFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Venues" />
                </SelectTrigger>
                <SelectContent>
                  {venues.map(venue => (
                    <SelectItem key={venue} value={venue}>{venue}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800"
              >
                Clear Filter
              </Button>
            </div>
          </div>
          
          {/* Matches Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-gray-100">
            <div className="grid grid-cols-3 bg-gray-100 p-4 font-semibold text-ipl-blue border-b border-gray-200">
              <div>Date</div>
              <div>Match Details</div>
              <div>Time</div>
            </div>
            
            {isLoading ? (
              // Skeleton loader for matches
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="border-b border-gray-100 p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Skeleton className="h-12 w-32" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <Skeleton className="h-12 w-32" />
                  </div>
                </div>
              ))
            ) : (
              paginatedMatches.length > 0 ? (
                paginatedMatches.map((match) => (
                  <div 
                    key={match.id} 
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 p-4">
                      <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <Calendar className="h-5 w-5 text-ipl-orange" />
                        <span className="font-medium">{match.date}</span>
                      </div>
                      
                      <div className="space-y-2 mb-4 md:mb-0">
                        <div className="font-medium text-ipl-blue">{match.matchDetails}</div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{match.venue}</span>
                        </div>
                        {match.result && (
                          <div className="flex items-center space-x-2 text-sm font-medium text-ipl-orange">
                            <Trophy className="h-4 w-4" />
                            <span>{match.result}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-5 w-5 text-ipl-blue" />
                          <span className="font-medium">{match.time}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {match.gmtTime} / {match.localTime}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No matches found matching your filters
                </div>
              )
            )}
          </div>
          
          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(index + 1);
                      }}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Matches;
