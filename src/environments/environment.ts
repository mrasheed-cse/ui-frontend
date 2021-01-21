export const environment = {
	production: false,
	"output-path": "./dist2/",
	apiUrl: 'http://localhost:8015/',
	pendingRequestMarker: 'PENDING',
	approvedRequestMarker: 'APPROVED',
	rejectedRequestMarker: 'REJECTED',
	ssmAssessmentHopMarker: "SSM",
	hodHopMarker: "HOD",
	ssmAssignmentHopMarker: "SSM2",
	clcHopMarker: "CLC",
	dataSpecialRequirementTypes: [
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