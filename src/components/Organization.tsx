import { roles } from "../data/roles";

export function Organization() {
    return (
        <main className="organization">
            <h2>Organization</h2>

            <div className="organization-list">
                {roles.map((person) => (
                    <div
                        className="organization-row"
                        key={person.firstName + person.lastName}
                    >
                        <span>
                            {person.firstName} {person.lastName}
                        </span>

                        <span>{person.role}</span>
                    </div>
                ))}
            </div>
        </main>
    );
}