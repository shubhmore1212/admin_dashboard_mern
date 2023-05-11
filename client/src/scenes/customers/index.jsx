import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import FlexBetween from "components/FlexBetween";

const CustomerCard = ({
  _id,
  name,
  email,
  phoneNumber,
  country,
  occupation,
  role,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary.main}
          gutterBottom
        >
          {role}
        </Typography>
        <Box>
          <FlexBetween>
            <Typography variant="h1" fontWeight="bold" component="div">
              {name}
            </Typography>
            <Box marginRight="1rem">
              <Avatar
                sx={{
                  width: 96,
                  height: 96,
                  fontSize: "3rem",
                  fontWeight: "bold",
                }}
              >
                {name.substring(1, 0)}
              </Avatar>
            </Box>
          </FlexBetween>
        </Box>
        <Typography
          sx={{
            mb: "-1.0rem",
          }}
          color={theme.palette.secondary[400]}
        >
          {occupation}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>{email}</Typography>
          <Typography>{phoneNumber}</Typography>
          <Typography>COUNTRY CODE: {country}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)");

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        {isNonMobile ? (
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={data || []}
            columns={columns}
          />
        ) : (
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(4,minmax(0,1fr))"
            justifyContent="space-between"
            rowGap="20px"
            columnGap="1.33%"
            sx={{
              "&>div": {
                gridColumn: "span 4",
              },
            }}
          >
            {data?.map((customer) => (
              <CustomerCard key={customer._id} {...customer} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Customers;
