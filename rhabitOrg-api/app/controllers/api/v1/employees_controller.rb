module Api::V1
    class EmployeesController < ApplicationController

        #Returns the entire organization in nested json object
        def index
            @employees = Employee.arrange_serializable(:order => :id)

            render json: @employees
        end

        def create
            #Find the parent node from the database based on ID sent from front end
            #Making sure that the parent_id supplied actually exists in DB
            begin parent = Employee.find(params[:parent_id])
                @newEmployee = Employee.create(first_name:params[:first_name], last_name:params[:last_name], title:params[:title], parent:parent)
                render json: @newEmployee 
            rescue => err
                render json: {error: err}
            end

        end

        #returns the direct children of specific employee in nested json object
        def show
            #Find the employee with id supplied from the front-end and return direct subtree of that node including the parent node
            begin @employees = Employee.find(params[:id]).subtree.arrange_serializable(:order => :id)
                render json: @employees
            rescue => err 
                render json: {error: err}
            end
        end

        def update
            #Find the employee with id supplied from the front-end
            begin @employee = Employee.find(params[:id])
                #Make sure that the new parent id supplied from the front-end actually exists in the database
                begin new_parent = Employee.find(params[:parent_id])
                    @employee.update_attributes(first_name:params[:first_name], last_name:params[:last_name], title:params[:title], parent:new_parent)
                    render json: @employee

                rescue => err
                    render json: {error: err}
                end
            rescue => err
                render json: {error: err}
            end
        end

        # If an employee has children the children will be adopted by the employee_to_removes's parent
        def destroy
            @employee_to_remove = Employee.find(params[:id])
            
            if @employee_to_remove.destroy
                render json: {sucess: 'Deleted successfully'}
            else
                render json: @employee_to_remove.errors, status: :unprocessable_entity
            end
        end

        private
            def employee_params
                params.require(:employee).permit(:first_name, :last_name, :title, :parent_id)
            end

    end
end