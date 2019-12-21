export const environment = {
   //production: true,
   production: false,
  //apiUrl: 'https://10.10.23.51:8444/nsa/', //prod
  //apiUrl: 'https://10.10.23.50:8443/nsa/', //pre-prod
  apiUrl: 'http://localhost:8443/', // dev-env
  pendingRequestMarker : 'PENDING',
  approvedRequestMarker : 'APPROVED',
  rejectedRequestMarker : 'REJECTED',
  ssmAssessmentHopMarker : "SSM",
  hodHopMarker : "HOD",
  ssmAssignmentHopMarker : "SSM2",
  clcHopMarker : "CLC",
  dataSpecialRequirementTypes : [
		{
			name: "Regular", value: "Regular"
		},
		{
			name: "Virtual", value: "Virtual"
		},
		{
			name: "Replacement", value: "Replacement"
		}
	]
};
