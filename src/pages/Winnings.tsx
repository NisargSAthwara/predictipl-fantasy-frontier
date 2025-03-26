
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Winnings = () => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [venue, setVenue] = useState('');
  const [predictedWinner, setPredictedWinner] = useState<string | null>(null);
  const [winProbability, setWinProbability] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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

  const venues = [
    "Ahmedabad",
    "Bengaluru",
    "Chennai",
    "Delhi",
    "Hyderabad",
    "Kolkata",
    "Lucknow",
    "Mumbai",
    "Pune",
    "Rajkot"
  ];

  const predictMatch = () => {
    // Validation
    if (!team1 || !team2 || !venue) {
      toast({
        title: "Incomplete selection",
        description: "Please select both teams and venue",
        variant: "destructive"
      });
      return;
    }

    if (team1 === team2) {
      toast({
        title: "Invalid selection",
        description: "Please select different teams",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate ML model prediction (would be replaced by actual API call)
    setTimeout(() => {
      // Simple demo logic for prediction
      const random = Math.random();
      const winner = random > 0.5 ? team1 : team2;
      const probability = 50 + Math.floor(Math.random() * 45);
      
      setPredictedWinner(winner);
      setWinProbability(probability);
      setIsLoading(false);
    }, 1500);
  };

  const resetPrediction = () => {
    setPredictedWinner(null);
    setWinProbability(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-24 md:py-28">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 text-ipl-blue">Match Winner Prediction</h1>
          <p className="text-center text-gray-600 mb-10">
            Use our advanced AI model to predict the outcome of IPL matches
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl">Select Teams</CardTitle>
                <CardDescription>Choose the teams and venue for prediction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Team 1</label>
                  <Select value={team1} onValueChange={setTeam1}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select team 1" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map(team => (
                        <SelectItem key={team} value={team}>{team}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium">Team 2</label>
                  <Select value={team2} onValueChange={setTeam2}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select team 2" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map(team => (
                        <SelectItem key={team} value={team}
                          disabled={team === team1}
                        >
                          {team}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium">Venue</label>
                  <Select value={venue} onValueChange={setVenue}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select venue" />
                    </SelectTrigger>
                    <SelectContent>
                      {venues.map(venue => (
                        <SelectItem key={venue} value={venue}>{venue}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full bg-ipl-orange hover:bg-ipl-orange/90" 
                  onClick={predictMatch}
                  disabled={isLoading}
                >
                  {isLoading ? "Analyzing..." : "Predict Winner"}
                </Button>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl">Prediction Results</CardTitle>
                <CardDescription>Our AI model's match prediction</CardDescription>
              </CardHeader>
              <CardContent>
                {predictedWinner ? (
                  <div className="space-y-6 text-center">
                    <div className="py-6">
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Predicted Winner</h3>
                      <div className="text-3xl font-bold text-ipl-blue">{predictedWinner}</div>
                      <div className="mt-2 text-ipl-orange font-semibold">
                        {winProbability}% win probability
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Match Details</h4>
                      <p className="text-gray-800">{team1} vs {team2}</p>
                      <p className="text-gray-600">Venue: {venue}</p>
                    </div>
                    
                    <div className="text-sm text-gray-500 italic">
                      *Prediction based on historical data and team performance metrics
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={resetPrediction}
                    >
                      Reset
                    </Button>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10">
                    <div className="text-gray-400 mb-4 text-6xl">🏏</div>
                    <h3 className="text-lg font-medium text-gray-700">No Prediction Yet</h3>
                    <p className="text-gray-500 mt-2">
                      Select both teams and venue, then click "Predict Winner" to see results
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Winnings;
