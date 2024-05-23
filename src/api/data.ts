import {faker} from "@faker-js/faker";

const posts = [...Array(15)].map(() => ({
    id: faker.string.uuid(),
    content:faker.lorem.paragraph(),
    author:faker.person.fullName(),
}))

const users = [...Array(15)].map(() => ({
    id: faker.string.uuid(),
    fullName: faker.person.fullName(),
    password: faker.internet.password(),
    email:faker.internet.email(),
    role:faker.datatype.boolean(),
}))

export default posts