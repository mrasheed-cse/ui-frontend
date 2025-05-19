export const environment = {
	production: true,
	apiUrl: '/nsa/',
  pendingRequestMarker : 'PENDING',
  approvedRequestMarker : 'APPROVED',
  rejectedRequestMarker : 'REJECTED',
  ssmAssessmentHopMarker : "SSM",
  rafmAssessmentHopMarker: "RAFM",
  hodHopMarker : "HOD",
  divisionHeadHopMarker: "DIVISIONAL HEAD",
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
