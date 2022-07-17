/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEmployee = /* GraphQL */ `
  subscription OnCreateEmployee($owner: String) {
    onCreateEmployee(owner: $owner) {
      id
      firstName
      middleName
      lastName
      gender
      email
      addressLine1
      addressLine2
      phone
      dob
      experience
      skills
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateEmployee = /* GraphQL */ `
  subscription OnUpdateEmployee($owner: String) {
    onUpdateEmployee(owner: $owner) {
      id
      firstName
      middleName
      lastName
      gender
      email
      addressLine1
      addressLine2
      phone
      dob
      experience
      skills
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteEmployee = /* GraphQL */ `
  subscription OnDeleteEmployee($owner: String) {
    onDeleteEmployee(owner: $owner) {
      id
      firstName
      middleName
      lastName
      gender
      email
      addressLine1
      addressLine2
      phone
      dob
      experience
      skills
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateData = /* GraphQL */ `
  subscription OnCreateData($owner: String) {
    onCreateData(owner: $owner) {
      id
      date
      atime
      ltime
      project
      description
      tags
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateData = /* GraphQL */ `
  subscription OnUpdateData($owner: String) {
    onUpdateData(owner: $owner) {
      id
      date
      atime
      ltime
      project
      description
      tags
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteData = /* GraphQL */ `
  subscription OnDeleteData($owner: String) {
    onDeleteData(owner: $owner) {
      id
      date
      atime
      ltime
      project
      description
      tags
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject {
    onCreateProject {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject {
    onUpdateProject {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject {
    onDeleteProject {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
