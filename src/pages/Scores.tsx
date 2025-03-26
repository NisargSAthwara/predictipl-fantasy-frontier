
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowDown, ArrowUp, Trophy, Award, TrendingUp } from 'lucide-react';

const Scores = () => {
  const [selectedTeam, setSelectedTeam] = useState('Mumbai Indians');
  const [selectedPlayer, setSelectedPlayer] = useState('Rohit Sharma');
  const [activeTab, setActiveTab] = useState('team');

  // Demo teams
  const teams = [
    "Chennai Super Kings",
    "Delhi Capitals",
    "Gujarat Titans",
    "Kolkata Knight Riders",
    "Lucknow Super Giants",
    "Mumbai Indians",
    "Punjab Kings",
    "Rajasthan Royals",
    "Royal Challengers Bangalore",
    "Sunrisers Hyderabad"
  ];

  // Demo players (would be filtered by team in real app)
  const players = [
    "Rohit Sharma",
    "Jasprit Bumrah",
    "Suryakumar Yadav",
    "Ishan Kishan",
    "Hardik Pandya",
    "Tilak Varma"
  ];

  // Demo match results data
  const recentMatchesData = [
    { opponent: "Chennai Super Kings", result: "Won", score: "213/3", oppScore: "210/6", venue: "Wankhede" },
    { opponent: "Royal Challengers", result: "Lost", score: "175/8", oppScore: "182/5", venue: "Chinnaswamy" },
    { opponent: "Rajasthan Royals", result: "Won", score: "193/5", oppScore: "171/9", venue: "Wankhede" },
    { opponent: "Punjab Kings", result: "Won", score: "203/4", oppScore: "156/10", venue: "Mohali" },
    { opponent: "Kolkata Knight Riders", result: "Lost", score: "162/8", oppScore: "168/4", venue: "Eden Gardens" },
  ];

  // Demo batting stats data
  const battingStatsData = [
    { name: "Rohit Sharma", matches: 14, runs: 385, avg: 32.08, sr: 142.60, fifties: 2, hundreds: 0, best: "83" },
    { name: "Suryakumar Yadav", matches: 12, runs: 446, avg: 40.55, sr: 175.10, fifties: 3, hundreds: 1, best: "103*" },
    { name: "Ishan Kishan", matches: 14, runs: 320, avg: 26.67, sr: 140.35, fifties: 2, hundreds: 0, best: "75" },
    { name: "Tilak Varma", matches: 14, runs: 343, avg: 31.18, sr: 147.63, fifties: 2, hundreds: 0, best: "84*" },
    { name: "Hardik Pandya", matches: 14, runs: 210, avg: 23.33, sr: 158.71, fifties: 0, hundreds: 0, best: "48" },
  ];

  // Demo bowling stats data
  const bowlingStatsData = [
    { name: "Jasprit Bumrah", matches: 14, wickets: 18, economy: 6.58, avg: 15.53, sr: 14.11, best: "5/21" },
    { name: "Hardik Pandya", matches: 14, wickets: 11, economy: 8.92, avg: 30.27, sr: 20.36, best: "3/24" },
    { name: "Piyush Chawla", matches: 12, wickets: 14, economy: 8.20, avg: 24.21, sr: 17.71, best: "3/22" },
    { name: "Kumar Kartikeya", matches: 9, wickets: 9, economy: 7.85, avg: 27.11, sr: 20.67, best: "2/19" },
    { name: "Jason Behrendorff", matches: 8, wickets: 10, economy: 8.31, avg: 22.50, sr: 16.20, best: "3/23" },
  ];

  // Demo team performance data for charts
  const teamRunsData = [
    { match: "Match 1", runs: 213, oppRuns: 210 },
    { match: "Match 2", runs: 175, oppRuns: 182 },
    { match: "Match 3", runs: 193, oppRuns: 171 },
    { match: "Match 4", runs: 203, oppRuns: 156 },
    { match: "Match 5", runs: 162, oppRuns: 168 },
    { match: "Match 6", runs: 195, oppRuns: 190 },
    { match: "Match 7", runs: 177, oppRuns: 181 },
  ];

  const teamWicketsData = [
    { name: "Powerplay", value: 18 },
    { name: "Middle Overs", value: 32 },
    { name: "Death Overs", value: 25 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // Demo player performance data
  const playerPerformanceData = [
    { match: "Match 1", runs: 45, sr: 150 },
    { match: "Match 2", runs: 23, sr: 115 },
    { match: "Match 3", runs: 83, sr: 172 },
    { match: "Match 4", runs: 65, sr: 162 },
    { match: "Match 5", runs: 12, sr: 100 },
    { match: "Match 6", runs: 57, sr: 158 },
    { match: "Match 7", runs: 38, sr: 135 },
  ];

  const matchScorecard = {
    match: "Mumbai Indians vs Chennai Super Kings",
    venue: "Wankhede Stadium, Mumbai",
    date: "12 April 2024",
    result: "Mumbai Indians won by 3 wickets",
    battingFirst: "Chennai Super Kings",
    firstInningsScore: "210/6 (20 overs)",
    secondInningsScore: "213/7 (19.4 overs)",
    playerOfMatch: "Rohit Sharma",
    batting: [
      { name: "Rohit Sharma", runs: 83, balls: 48, fours: 6, sixes: 5, sr: 172.92 },
      { name: "Ishan Kishan", runs: 45, balls: 32, fours: 4, sixes: 2, sr: 140.63 },
      { name: "Suryakumar Yadav", runs: 32, balls: 16, fours: 2, sixes: 3, sr: 200.00 },
      { name: "Hardik Pandya", runs: 29, balls: 18, fours: 2, sixes: 2, sr: 161.11 },
    ],
    bowling: [
      { name: "Jasprit Bumrah", overs: 4, maidens: 0, runs: 28, wickets: 3, economy: 7.00 },
      { name: "Hardik Pandya", overs: 3, maidens: 0, runs: 34, wickets: 1, economy: 11.33 },
      { name: "Kumar Kartikeya", overs: 4, maidens: 0, runs: 42, wickets: 2, economy: 10.50 },
    ]
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-24 md:py-28">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 text-ipl-blue">Match Analysis & Statistics</h1>
          <p className="text-center text-gray-600 mb-10">
            Comprehensive analytics for IPL teams and players
          </p>

          <Tabs defaultValue="team" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="team">Team Analysis</TabsTrigger>
              <TabsTrigger value="player">Player Statistics</TabsTrigger>
            </TabsList>

            {/* Team Analysis Tab */}
            <TabsContent value="team" className="space-y-8">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-3">
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map(team => (
                        <SelectItem key={team} value={team}>{team}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-ipl-blue hover:bg-ipl-blue/90">
                  Analyze
                </Button>
              </div>

              {/* Team Overview Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Matches</p>
                        <h4 className="text-2xl font-bold">14</h4>
                      </div>
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Trophy className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-xs">
                      <div className="flex items-center text-green-600">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        <span>9 wins</span>
                      </div>
                      <span className="mx-1">|</span>
                      <div className="flex items-center text-red-600">
                        <ArrowDown className="h-3 w-3 mr-1" />
                        <span>5 losses</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Run Rate</p>
                        <h4 className="text-2xl font-bold">9.24</h4>
                      </div>
                      <div className="bg-orange-100 p-2 rounded-full">
                        <TrendingUp className="h-5 w-5 text-orange-600" />
                      </div>
                    </div>
                    <div className="mt-2 text-xs flex items-center text-green-600">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      <span>0.52 higher than average</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Avg. Score</p>
                        <h4 className="text-2xl font-bold">183.5</h4>
                      </div>
                      <div className="bg-green-100 p-2 rounded-full">
                        <Award className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-blue-600">
                      2nd highest in the tournament
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Points</p>
                        <h4 className="text-2xl font-bold">18</h4>
                      </div>
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Trophy className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-purple-600">
                      Qualified for playoffs
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Team Performance Charts */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Run Comparison (Last 7 Matches)</CardTitle>
                    <CardDescription>Team's performance by runs scored</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={teamRunsData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="match" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="runs" name="Team Runs" fill="#3182CE" />
                          <Bar dataKey="oppRuns" name="Opposition Runs" fill="#E53E3E" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Wickets Distribution</CardTitle>
                    <CardDescription>Wickets taken in different phases</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={teamWicketsData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {teamWicketsData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Matches */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Matches</CardTitle>
                  <CardDescription>Team's last 5 matches performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Opponent</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Opp. Score</TableHead>
                        <TableHead>Venue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentMatchesData.map((match, index) => (
                        <TableRow key={index}>
                          <TableCell>{match.opponent}</TableCell>
                          <TableCell>
                            <span className={match.result === "Won" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                              {match.result}
                            </span>
                          </TableCell>
                          <TableCell>{match.score}</TableCell>
                          <TableCell>{match.oppScore}</TableCell>
                          <TableCell>{match.venue}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Batting and Bowling Stats */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Batting Stats</CardTitle>
                    <CardDescription>Top 5 batsmen by runs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Player</TableHead>
                          <TableHead className="text-right">Runs</TableHead>
                          <TableHead className="text-right">Avg</TableHead>
                          <TableHead className="text-right">SR</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {battingStatsData.map((player, index) => (
                          <TableRow key={index}>
                            <TableCell>{player.name}</TableCell>
                            <TableCell className="text-right">{player.runs}</TableCell>
                            <TableCell className="text-right">{player.avg}</TableCell>
                            <TableCell className="text-right">{player.sr}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Bowling Stats</CardTitle>
                    <CardDescription>Top 5 bowlers by wickets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Player</TableHead>
                          <TableHead className="text-right">Wickets</TableHead>
                          <TableHead className="text-right">Econ</TableHead>
                          <TableHead className="text-right">Avg</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bowlingStatsData.map((player, index) => (
                          <TableRow key={index}>
                            <TableCell>{player.name}</TableCell>
                            <TableCell className="text-right">{player.wickets}</TableCell>
                            <TableCell className="text-right">{player.economy}</TableCell>
                            <TableCell className="text-right">{player.avg}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Player Statistics Tab */}
            <TabsContent value="player" className="space-y-8">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-3 grid md:grid-cols-2 gap-4">
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map(team => (
                        <SelectItem key={team} value={team}>{team}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select player" />
                    </SelectTrigger>
                    <SelectContent>
                      {players.map(player => (
                        <SelectItem key={player} value={player}>{player}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-ipl-blue hover:bg-ipl-blue/90">
                  Analyze
                </Button>
              </div>

              {/* Player Profile */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-5xl">
                      👤
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-center md:text-left">{selectedPlayer}</h2>
                      <p className="text-gray-500 mb-4 text-center md:text-left">{selectedTeam}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <p className="text-sm text-gray-500">Matches</p>
                          <p className="text-lg font-bold">105</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <p className="text-sm text-gray-500">Runs</p>
                          <p className="text-lg font-bold">3,586</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <p className="text-sm text-gray-500">Average</p>
                          <p className="text-lg font-bold">34.82</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <p className="text-sm text-gray-500">Strike Rate</p>
                          <p className="text-lg font-bold">138.5</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Player Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance in Last 7 Matches</CardTitle>
                  <CardDescription>Runs scored and strike rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={playerPerformanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="match" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="runs" name="Runs" stroke="#3182CE" activeDot={{ r: 8 }} />
                        <Line yAxisId="right" type="monotone" dataKey="sr" name="Strike Rate" stroke="#E53E3E" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Match Scorecard */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Match Scorecard</CardTitle>
                  <CardDescription>{matchScorecard.match} - {matchScorecard.date}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Venue:</span>
                        <span className="ml-2">{matchScorecard.venue}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Result:</span>
                        <span className="ml-2">{matchScorecard.result}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-500">{matchScorecard.battingFirst}:</span>
                        <span className="ml-2">{matchScorecard.firstInningsScore}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">{selectedTeam}:</span>
                        <span className="ml-2">{matchScorecard.secondInningsScore}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold mb-2">{selectedPlayer}'s Batting</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Runs</TableHead>
                          <TableHead>Balls</TableHead>
                          <TableHead>4s</TableHead>
                          <TableHead>6s</TableHead>
                          <TableHead>SR</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">{matchScorecard.batting[0].runs}</TableCell>
                          <TableCell>{matchScorecard.batting[0].balls}</TableCell>
                          <TableCell>{matchScorecard.batting[0].fours}</TableCell>
                          <TableCell>{matchScorecard.batting[0].sixes}</TableCell>
                          <TableCell>{matchScorecard.batting[0].sr}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold mb-2">Other Top Performers</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Player</TableHead>
                          <TableHead>Runs</TableHead>
                          <TableHead>Balls</TableHead>
                          <TableHead>SR</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {matchScorecard.batting.slice(1).map((player, index) => (
                          <TableRow key={index}>
                            <TableCell>{player.name}</TableCell>
                            <TableCell>{player.runs}</TableCell>
                            <TableCell>{player.balls}</TableCell>
                            <TableCell>{player.sr}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Scores;
