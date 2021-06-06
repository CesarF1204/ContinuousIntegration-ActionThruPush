class GitCommand {
    constructor(working_directory){
        this.working_directory = working_directory;
    }
    //Command: git init 
    init(){
        this.staging = [];
        this.local_repository = [];
        return "Initialized as empty Git repository.";
    }

    //Command: git status
    status(){        
        /*
            For assignment #1:
            Create logic here and run unit testing.
        */
        let result = '';
        let file_count = 0;
        let modified_files = this.working_directory.new_changes;
        // console.log(modified_files);
        for(let file in modified_files){
            result += `\n${file}`;
            file_count++;
        }
        if(file_count == 0) {
            result = "\n";
        }
        return `You have ${file_count} change/s.`+result;
    }

    //Command: git add <filename/file directory/wildcard> 
    add(path_file){
        let modified_files = this.working_directory.new_changes;
        
        if(modified_files[path_file]){
            this.staging.push(modified_files[path_file]);
            delete modified_files[path_file];
        }
        /*
            For assignment #2:
            Create logic here and run unit testing.
            Don't forget to uncomment the unit tests.
        */
        else if(path_file === ".") {
            this.working_directory.new_changes = this.local_repository;
        }
        else if(path_file === "*"){   
            for(let files in modified_files) {
                if(files !== "views/index.html") {
                    this.working_directory.new_changes = {[files]: modified_files[files]};
                }
            }
        }
        else{
            return `Failed to add ${path_file}! File is not modified or missing.`;
        }
        // console.log(modified_files[path_file]);
        return "Successfully added as index file/s.";
    }

    //Command: git commit -m "<message>"
    commit(message){
        if(this.staging.length > 0){
            this.local_repository.push({ "message": message, "files": this.staging });
            this.staging = [];
            return "Done committing to local repository.";
        }
        return "Nothing to commit.";
    }

    //Command: git push
    push(){   
        if(this.local_repository.length > 0){
            return "Done pushing to remote repository.";
        } 
        else {
            return "Nothing to push. No committed file found.";
        }     
    }
}


module.exports = GitCommand;