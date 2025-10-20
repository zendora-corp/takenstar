'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Paper,
  Alert,
  CircularProgress,
  Autocomplete,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
} from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  getActiveExamYear,
  getDistricts,
  getSchools,
  submitRegistration,
  type District,
  type School,
  type ExamYear,
} from '@/lib/api';

const classes = [6, 7, 8, 9, 10, 11, 12];
const genders = ['Male', 'Female', 'Other'];
const mediums = ['Assamese', 'English'];
const paymentOptions = ['Online', 'Offline'];

export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  const [examYear, setExamYear] = useState<ExamYear | null>(null);
  const [districts, setDistricts] = useState<District[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);

  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dob: '',
    class: '',
    medium: '',
    schoolId: '',
    schoolRollNo: '',
    districtId: '',
    address: '',
    studentMobile: '',
    guardianMobile: '',
    email: '',
    paymentOption: '',
    transactionId: '',
    offlineReceiptNo: '',
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [yearData, districtsData, schoolsData] = await Promise.all([
          getActiveExamYear(),
          getDistricts(),
          getSchools(),
        ]);
        setExamYear(yearData);
        setDistricts(districtsData);
        setSchools(schoolsData);
        setFilteredSchools(schoolsData);
      } catch (err) {
        setError('Failed to load registration data. Please refresh the page.');
      } finally {
        setLoadingData(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!examYear) {
      setError('No active exam year found. Please try again later.');
      setLoading(false);
      return;
    }

    try {
      await submitRegistration({
        examYearId: examYear.id,
        fullName: formData.fullName,
        gender: formData.gender as 'Male' | 'Female' | 'Other',
        dob: formData.dob,
        class: parseInt(formData.class),
        medium: formData.medium as 'Assamese' | 'English',
        schoolId: formData.schoolId,
        schoolRollNo: formData.schoolRollNo,
        districtId: formData.districtId,
        address: formData.address,
        studentMobile: formData.studentMobile,
        guardianMobile: formData.guardianMobile,
        email: formData.email || undefined,
        paymentOption: formData.paymentOption as 'Online' | 'Offline',
        transactionId: formData.transactionId || undefined,
        offlineReceiptNo: formData.offlineReceiptNo || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: '#FFFFFF', textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>Loading registration form...</Typography>
      </Box>
    );
  }

  if (submitted) {
    return (
      <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: '#FFFFFF' }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 6,
                textAlign: 'center',
                borderRadius: 4,
                backgroundColor: 'background.default',
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
                Registration Successful!
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'text.secondary', mb: 3 }}>
                Thank you for registering for Takenstar Talent Search {examYear?.year}.
                {formData.email && (
                  <>
                    {' '}
                    A confirmation email has been sent to <strong>{formData.email}</strong>.
                  </>
                )}
              </Typography>
              <Alert severity="info" sx={{ textAlign: 'left' }}>
                Your admit card will be available for download approximately 2 weeks before the examination date.
                Please check your email regularly for updates.
              </Alert>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: '#FFFFFF' }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
            Registration Form
          </Typography>
          {examYear && (
            <Typography variant="body1" align="center" sx={{ color: 'text.secondary', mb: 4 }}>
              Exam Year: {examYear.year} | Exam Date: {new Date(examYear.examDate).toLocaleDateString()}
            </Typography>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    required
                    label="Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    disabled={loading}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    required
                    select
                    label="Gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    disabled={loading}
                  >
                    {genders.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    required
                    type="date"
                    label="Date of Birth"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    disabled={loading}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    required
                    select
                    label="Class"
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    disabled={loading}
                  >
                    {classes.map((cls) => (
                      <MenuItem key={cls} value={cls}>
                        Class {cls}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    required
                    select
                    label="Medium"
                    value={formData.medium}
                    onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                    disabled={loading}
                  >
                    {mediums.map((medium) => (
                      <MenuItem key={medium} value={medium}>
                        {medium}
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
                    disabled={loading}
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
                    disabled={loading || !formData.districtId}
                    renderInput={(params) => <TextField {...params} required label="School" />}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    required
                    label="School Roll Number"
                    value={formData.schoolRollNo}
                    onChange={(e) => setFormData({ ...formData, schoolRollNo: e.target.value })}
                    disabled={loading}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    rows={2}
                    label="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={loading}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    required
                    label="Student Mobile Number"
                    value={formData.studentMobile}
                    onChange={(e) => setFormData({ ...formData, studentMobile: e.target.value })}
                    disabled={loading}
                    inputProps={{ maxLength: 10, pattern: '[0-9]{10}' }}
                    helperText="10-digit mobile number"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    required
                    label="Guardian Mobile Number"
                    value={formData.guardianMobile}
                    onChange={(e) => setFormData({ ...formData, guardianMobile: e.target.value })}
                    disabled={loading}
                    inputProps={{ maxLength: 10, pattern: '[0-9]{10}' }}
                    helperText="10-digit mobile number"
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email Address (Optional)"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={loading}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <FormControl component="fieldset" required>
                    <FormLabel component="legend">Payment Option</FormLabel>
                    <RadioGroup
                      row
                      value={formData.paymentOption}
                      onChange={(e) => setFormData({ ...formData, paymentOption: e.target.value })}
                    >
                      {paymentOptions.map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio />}
                          label={option}
                          disabled={loading}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>

                {formData.paymentOption === 'Online' && (
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Transaction ID"
                      value={formData.transactionId}
                      onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                      disabled={loading}
                      helperText="Enter your online payment transaction ID"
                    />
                  </Grid>
                )}

                {formData.paymentOption === 'Offline' && (
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Offline Receipt Number"
                      value={formData.offlineReceiptNo}
                      onChange={(e) => setFormData({ ...formData, offlineReceiptNo: e.target.value })}
                      disabled={loading}
                      helperText="Enter your offline payment receipt number"
                    />
                  </Grid>
                )}

                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    fullWidth
                    disabled={loading}
                    sx={{ py: 1.5, fontSize: '1.1rem', mt: 2 }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Registration'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
