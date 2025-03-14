import { MemberRole } from "@/models/API";

const membersRole = [
    {
        name: 'Agent',
        value: MemberRole.AGENT
    }, {
        name: 'Partner',
        value: MemberRole.PARTNER
    }, {
        name: 'Supervisor',
        value: MemberRole.SUPERVISOR
    }
]

export default membersRole;