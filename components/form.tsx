"use client"
import React, { useState } from 'react'
import {z} from 'zod'
import { FormDataSchema, ValidSocialMedia } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm, SubmitHandler} from 'react-hook-form'

type Inputs = z.infer<typeof FormDataSchema>

const Form = () => {
    const steps = [
        {
            id: 'Step 1',
            name: 'Contact Details',
            fields: ['name', 'phoneNumber']
        },
        {
            id: 'Step 2',
            name: 'Social Media Channel',
            fields: ['socialMedias']
        },
        {
            id: 'Step 3',
            name: 'Goals',
            fields: ['goals']
        },
        {
            id: 'Step 4',
            name: 'Type of business',
            fields: ['business']
        },
        {
            id: 'Step 5',
            name: 'Monthly Budget',
            fields: ['monthlyBudget'],
        },
        {
            id: 'Step 6',
            name: 'Starting period',
            fields: ['startingPeriod'],
        }
    ]

    const { register, handleSubmit, watch, reset, trigger, formState: {errors}} = useForm<Inputs>({
        resolver: zodResolver(FormDataSchema)
    })

    // const processForm: SubmitHandler<Inputs> = data = {
    //     console.log(data)
    //     reset()
    // }

    const [currentStep, setCurrentStep] = useState(0)
    const [previousStep, setPreviousStep] = useState(0)
    const delta = currentStep - previousStep

    type FieldName = keyof Inputs

    const next = async () => {
        const fields = steps[currentStep].fields
        const output = await trigger(fields as FieldName[], {shouldFocus: true})
        if(!output) return
        if(currentStep < steps.length - 1) {
            if(currentStep === steps.length - 2) {
                // await handleSubmit()
            }
            setPreviousStep(currentStep)
        setCurrentStep(step => step + 1)
        }
    }
    const prev = () => {
        if (currentStep > 0) {
            setPreviousStep(currentStep)
            setCurrentStep(step => step - 1)
        }
    }
    return (
        <section className='absolute inset-0 flex flex-col justify-between p-24'>
            <nav aria-label='Progress'>
                <ol role='list' className="space-y-4 md:flex md:space=x-8 md:space-y-0">
                    {steps.map((step, index) => (
                        <li key={step.name} className='md:flex-1'>
                            {currentStep > index ? (
                                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                                    <span className='text-sm font-medium text-sky-600 transistion-colors'>
                                        {step.id}
                                    </span>
                                    <span className='text-sm font-medium'>{step.name}</span>
                                </div>
                            ) : currentStep === index ? (
                                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                                    <span className='text-sm font-medium text-sky-600'>
                                        {step.id}
                                    </span>
                                    <span className='text-sm font-medium'>{step.name}</span>
                                </div>
                            ) : (
                                <div className="group flex w-full flex-col border-l-4 border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                                    <span className='text-sm font-medium text-gray-500 transition-colors'>
                                        {step.id}
                                    </span>
                                    <span className='text-sm font-medium'>{step.name}</span>
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>

            <form className='mt-12 py-12'>
                {currentStep === 0 && (
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Contact Details</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Please Provide Your Contact Details
                        </p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor='name' className='block text-sm font-medium leading-6 text-gray-900'>Name</label>
                                <div className="my-2">
                                    <input type='text' id='name' {...register('name')} autoComplete='given-name'
                                        className='block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6' />
                                        {errors.name?.message && (
                                            <p className="mt-2 text-sm text-red-500">{ errors.name.message}</p>
                                        )}
                                </div>
                                <label htmlFor='phoneNumber' className='block text-sm font-medium leading-6 text-gray-900'>Phone Number</label>
                                <div className="mt-2">
                                    <input type='text' id='phoneNumber' {...register('phoneNumber')} autoComplete='given-name'
                                        className='block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6' />
                                        {errors.phoneNumber?.message && (
                                            <p className="mt-2 text-sm text-red-500">{ errors.phoneNumber.message}</p>
                                        )}
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                )}
                {currentStep === 1 && (
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Contact Details</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Please Provide Your Social Media Details
                        </p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                
                                {/* <label htmlFor='name' className='block text-sm font-medium leading-6 text-gray-900'>Name</label> */}
                                {ValidSocialMedia.map(socialMedia => (
                                    <label key={socialMedia} className="flex items-center mb-2 capitalize">
                                        <input type='checkbox' value="socialMedia" className='mr-2'
                                        {...register('socialMedias', {
                                            required: 'Atleast one social media must be selected.'
                                        })} />
                                        {socialMedia}
                                        {errors.socialMedias?.message && (
                                            <p className="mt-2 text-sm text-red-500">{ errors.socialMedias.message}</p>
                                        )}
                                    </label>
                                ))}
                                
                            </div>
                            
                        </div>
                    </div>
                )}
                {currentStep === 2 && (
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Contact Details</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Please set the goals
                        </p>
                    </div>
                )}
                {currentStep === 3 && (
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Contact Details</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Please select which type of business or industry
                        </p>
                    </div>
                )}
                 {currentStep === 4 && (
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Contact Details</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Please select the monthly budget
                        </p>
                    </div>
                )}
                 {currentStep === 5 && (
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Contact Details</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Please choose the starting period
                        </p>
                    </div>
                )}
            </form>
            <div className="mt-8 pt-5">
                <div className="flex justify-between">
                    <button type='button' onClick={prev} disabled={currentStep === 0} className='rounded bg-blue-800 p-2 text-white text-sm font-semibold shadow-sm ring-1 ring-inset ring-blue-600 hover:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-50'>Previous</button>
                    <button type='button' onClick={next} disabled={currentStep === steps.length - 1} className='rounded bg-blue-800 p-2 text-white text-sm font-semibold shadow-sm ring-1 ring-inset ring-blue-600 hover:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-50'>Next</button>
                </div>
            </div>
        </section>
    )
}

export default Form
