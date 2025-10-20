'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Autocomplete,
  MenuItem,
  Chip,
  Divider,
} from '@mui/material';
import NavigationBar from '@/components/AppBar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {
  getAllExamYears,
  getDistricts,
  getSchools,
  resultLookup,
  getTop3ByGroup,
  type ExamYear,
  type District,
  type School,
  type StudentResult,
  type GroupToppers,
} from '@/lib/api';

export default function ResultsPage() {
  const [examYears, setExamYears] = useState<ExamYear[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [hallOfFame, setHallOfFame] = useState<GroupToppers[]>([]);

  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [loadingHOF, setLoadingHOF] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<StudentResult | null>(null);

  const [formData, setFormData] = useState({
    examYear: '',
    districtId: '',
    schoolId: '',
    schoolRollNo: '',
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [yearsData, districtsData, schoolsData] = await Promise.all([
          getAllExamYears(),
          getDistricts(),
          getSchools(),
        ]);
        setExamYears(yearsData);
        setDistricts(districtsData);
        setSchools(schoolsData);
        setFilteredSchools(schoolsData);

        if (yearsData.length > 0) {
          setFormData((prev) => ({ ...prev, examYear: yearsData[0].year.toString() }));
          loadHallOfFame(yearsData[0].year);
        }
      } catch (err) {
        setError('Failed to load data. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (formData.districtId) {
      const filtered = schools.filter((school) => school.districtId === formData.districtId);
      setFilteredSchools(filtered);
      if (formData.schoolId && !filtered.find((s) => s.id === formData.schoolId)) {
        setFormData((prev) => ({ ...prev, schoolId: '' }));
      }
    } else {
      setFilteredSchools(schools);
    }
  }, [formData.districtId, schools, formData.schoolId]);

  const loadHallOfFame = async (year: number) => {
    setLoadingHOF(true);
    try {
      const data = await getTop3ByGroup(year);
      setHallOfFame(data);
    } catch (err) {
      setHallOfFame([]);
    } finally {
      setLoadingHOF(false);
    }
  };

  const handleYearChange = (year: string) => {
    setFormData((prev) => ({ ...prev, examYear: year }));
    if (year) {
      loadHallOfFame(parseInt(year));
    }
  };

  const handleSearch = async () => {
    if (!formData.examYear || !formData.districtId || !formData.schoolId || !formData.schoolRollNo) {
      setError('Please fill all fields to search for results');
      return;
    }

    setSearching(true);
    setError(null);
    setResult(null);

    try {
      const district = districts.find((d) => d.id === formData.districtId);
      const school = schools.find((s) => s.id === formData.schoolId);

      if (!district || !school) {
        throw new Error('Invalid district or school selected');
      }

      const data = await resultLookup({
        examYear: parseInt(formData.examYear),
        districtName: district.name,
        schoolName: school.name,
        schoolRollNo: formData.schoolRollNo,
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Result not found. Please check your details and try again.');
    } finally {
      setSearching(false);
    }
  };

  const scholarshipAmounts = ['₹10,000', '₹5,000', '₹3,000'];

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <NavigationBar />
        <Box sx={{ py: 10, textAlign: 'center' }}>
          <CircularProgress size={60} />
          <Typography sx={{ mt: 2, color: 'text.secondary' }}>Loading results...</Typography>
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <NavigationBar />

      <Box sx={{ py: { xs: 6, md: 10 }, background: 'linear-gradient(135deg, #2F55D4 0%, #5C79EA 100%)', color: '#FFFFFF' }}>
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Typography variant="h2" align="center" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, mb: 2 }}>
              Check Your Results
            </Typography>
            <Typography variant="h6" align="center" sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, mb: 5, opacity: 0.95 }}>
              Enter your details to view your examination results
            </Typography>

            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    select
                    label="Exam Year"
                    value={formData.examYear}
                    onChange={(e) => handleYearChange(e.target.value)}
                    disabled={searching}
                  >
                    {examYears.map((year) => (
                      <MenuItem key={year.id} value={year.year}>
                        {year.year}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Autocomplete
                    options={districts}
                    getOptionLabel={(option) => option.name}
                    value={districts.find((d) => d.id === formData.districtId) || null}
                    onChange={(_, newValue) => {
                      setFormData({ ...formData, districtId: newValue?.id || '' });
                    }}
                    disabled={searching}
                    renderInput={(params) => <TextField {...params} required label="District" />}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Autocomplete
                    options={filteredSchools}
                    getOptionLabel={(option) => option.name}
                    value={filteredSchools.find((s) => s.id === formData.schoolId) || null}
                    onChange={(_, newValue) => {
                      setFormData({ ...formData, schoolId: newValue?.id || '' });
                    }}
                    disabled={searching || !formData.districtId}
                    renderInput={(params) => <TextField {...params} required label="School" />}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="School Roll Number"
                    value={formData.schoolRollNo}
                    onChange={(e) => setFormData({ ...formData, schoolRollNo: e.target.value })}
                    disabled={searching}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={handleSearch}
                    startIcon={searching ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                    disabled={searching}
                    sx={{ py: 1.5, fontSize: '1.1rem' }}
                  >
                    {searching ? 'Searching...' : 'Search Result'}
                  </Button>
                </Grid>
              </Grid>

              {error && (
                <Alert severity="error" sx={{ mt: 3 }} onClose={() => setError(null)}>
                  {error}
                </Alert>
              )}

              {result && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <Box sx={{ mt: 3, p: 3, backgroundColor: 'success.light', borderRadius: 2, border: '2px solid', borderColor: 'success.main' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <EmojiEventsIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
                      <Chip label={result.resultStatus} color="success" sx={{ fontWeight: 600, fontSize: '0.9rem' }} />
                    </Box>

                    <Grid container spacing={2}>
                      <Grid size={{ xs: 6, md: 4 }}>
                        <Typography variant="body2" color="text.secondary">Name</Typography>
                        <Typography variant="body1" fontWeight={600}>{result.student.fullName}</Typography>
                      </Grid>
                      <Grid size={{ xs: 6, md: 4 }}>
                        <Typography variant="body2" color="text.secondary">Class</Typography>
                        <Typography variant="body1" fontWeight={600}>{result.student.class}</Typography>
                      </Grid>
                      <Grid size={{ xs: 6, md: 4 }}>
                        <Typography variant="body2" color="text.secondary">School Roll No</Typography>
                        <Typography variant="body1" fontWeight={600}>{result.student.schoolRollNo}</Typography>
                      </Grid>
                      <Grid size={{ xs: 6, md: 4 }}>
                        <Typography variant="body2" color="text.secondary">Total Marks</Typography>
                        <Typography variant="body1" fontWeight={600} color="primary.main">{result.totalMarks}</Typography>
                      </Grid>
                      <Grid size={{ xs: 6, md: 4 }}>
                        <Typography variant="body2" color="text.secondary">Percentage</Typography>
                        <Typography variant="body1" fontWeight={600} color="primary.main">{result.percentage}%</Typography>
                      </Grid>
                      <Grid size={{ xs: 6, md: 4 }}>
                        <Typography variant="body2" color="text.secondary">Rank</Typography>
                        <Typography variant="body1" fontWeight={600} color="secondary.main">#{result.rank}</Typography>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Subject-wise Marks:</Typography>
                    <Grid container spacing={1}>
                      <Grid size={{ xs: 6, md: 4 }}><Typography variant="body2">GK: {result.marks.gk}</Typography></Grid>
                      <Grid size={{ xs: 6, md: 4 }}><Typography variant="body2">Science: {result.marks.science}</Typography></Grid>
                      <Grid size={{ xs: 6, md: 4 }}><Typography variant="body2">Maths: {result.marks.mathematics}</Typography></Grid>
                      <Grid size={{ xs: 6, md: 4 }}><Typography variant="body2">Logical Reasoning: {result.marks.logicalReasoning}</Typography></Grid>
                      <Grid size={{ xs: 6, md: 4 }}><Typography variant="body2">Current Affairs: {result.marks.currentAffairs}</Typography></Grid>
                    </Grid>
                  </Box>
                </motion.div>
              )}
            </Paper>
          </motion.div>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, mb: 2, color: 'text.primary' }}>
            Hall of Fame
          </Typography>
          <Typography variant="body1" align="center" sx={{ fontSize: '1.1rem', color: 'text.secondary', mb: 6 }}>
            Top 3 performers by group{formData.examYear && ` - ${formData.examYear}`}
          </Typography>

          {loadingHOF ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <CircularProgress />
            </Box>
          ) : hallOfFame.length > 0 ? (
            <Grid container spacing={4}>
              {hallOfFame.map((group, groupIndex) => (
                <Grid size={{ xs: 12 }} key={groupIndex}>
                  <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                        Group {group.group}
                      </Typography>
                      <Grid container spacing={3}>
                        {group.toppers.slice(0, 3).map((topper, index) => (
                          <Grid size={{ xs: 12, md: 4 }} key={index}>
                            <Card sx={{ background: index === 0 ? 'linear-gradient(135deg, #FFC107 0%, #F4B400 100%)' : index === 1 ? 'linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%)' : 'linear-gradient(135deg, #CD7F32 0%, #B87333 100%)', color: '#FFFFFF', height: '100%' }}>
                              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                <Box sx={{ fontSize: 40, mb: 1 }}>{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{topper.student.fullName}</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                                  Class {topper.student.class} | {topper.student.medium}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>{topper.student.schoolName}</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>{topper.student.districtName}</Typography>
                                <Divider sx={{ my: 1, backgroundColor: 'rgba(255,255,255,0.3)' }} />
                                <Typography variant="h5" sx={{ fontWeight: 700 }}>{topper.percentage}%</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>Marks: {topper.totalMarks}</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>Rank: #{topper.rank}</Typography>
                                {index < 3 && (
                                  <Chip label={`Scholarship: ${scholarshipAmounts[index]}`} sx={{ mt: 2, fontWeight: 600, backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF' }} />
                                )}
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="info" sx={{ textAlign: 'center' }}>
              Hall of Fame will be updated after results are declared for the selected year.
            </Alert>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
